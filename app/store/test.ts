import { createSlice } from "@reduxjs/toolkit";
import { storeInterface, testProps } from "../_interface";

const initialState: testProps = {
  indexOfTest: 1,
  answers: [],
  access: false,
};

const test = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTest: (state, action) => {
      const type = action.payload.type;
      const questionType = action.payload.questionType;
      const id = action.payload.id;
      const choiceId = action.payload.choiceId;
      const pollId = action.payload?.pollId;

      switch (type) {
        case "INC_STEP":
          state.indexOfTest = state.indexOfTest + 1;
          break;
        case "DEC_STEP":
          state.indexOfTest = state.indexOfTest - 1;
          break;

        case "ACCESS":
          state.access = action?.payload?.data;
          break;

        case "ADD_QUESTION":
          state.answers = state.answers?.filter(
            (item) => item?.questionId !== id
          );
          if (questionType == 1 || questionType == 2) {
            state.answers = [
              ...state.answers,
              {
                id: 0,
                questionId: id,
                score: null,
                choiceId,
                description: null,
                pollId,
              },
            ];
          }
          if (questionType == 3 || questionType == 4) {
            state.answers = [
              ...state.answers,
              {
                id: 0,
                questionId: id,
                score: choiceId,
                choiceId: null,
                description: null,
                pollId,
              },
            ];
          }
          if (questionType == 5) {
            if (!choiceId) {
              state.answers = [...state.answers];
            } else {
              state.answers = [
                ...state.answers,
                {
                  id: 0,
                  questionId: id,
                  score: null,
                  choiceId: null,
                  description: choiceId,
                  pollId,
                },
              ];
            }
          }
          break;

        case "RESET":
          state = {
            indexOfTest: 1,
            answers: [],
            access: false,
          };
          break;

        default:
          break;
      }
    },
  },
});

export const getTest = (state: storeInterface) => state.test;

export const { setTest } = test.actions;

export default test.reducer;
