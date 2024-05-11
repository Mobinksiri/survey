import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../_utils/localStorage";
import { store } from "../store";
import { setApiLoading } from "../store/loading";
import toast from "react-hot-toast";
import { NEED_LOGIN, TOKEN } from "../_toast_messages";

interface ApiCallOptions {
  url: string;
  params?: any;
  data?: {};
  method?: string;
  callback: (response: any, error: any) => void;
  formDataIsNeeded?: boolean;
  loading?: boolean;
  baseUrl: string;
}

interface useApiCallOptions {
  url: string; // URL can be dynamic based on the prop
  params?: any;
  data?: {};
  method?: string;
  shouldCallApi?: boolean;
  formDataIsNeeded?: boolean;
  queryOptions?: UseQueryOptions<any, Error>;
  loading?: boolean;
  baseUrl: string;
}

const apiCall = async ({
  baseUrl,
  url = "",
  params = {},
  data = {},
  method = "get",
  callback,
  formDataIsNeeded = false,
  loading = true,
}: ApiCallOptions): Promise<void> => {
  const userData: any = getFromLocalStorage("user");

  const cancelTokenSource = axios.CancelToken.source();

  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + userData?.token,
  };

  if (formDataIsNeeded) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const completeUrl: string = baseUrl + url;

  if (loading) {
    store.dispatch(setApiLoading(true));
  }

  try {
    const response: AxiosResponse = await axios({
      method,
      url: completeUrl,
      headers,
      params,
      data,
      cancelToken: cancelTokenSource.token,
    });

    callback(response.data, null);
    if (loading) {
      store.dispatch(setApiLoading(false));
    }
  } catch (error: any) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (userData) {
        toast.error(TOKEN);
        if (typeof window !== undefined) {
          window.location.href = "/";
          removeFromLocalStorage("user");
        }
      } else {
        toast.error(NEED_LOGIN);
      }
      store.dispatch(setApiLoading(false));
      return;
    }

    callback(null, error?.response?.data);
    toast?.error(error?.response?.data?.message);
    store.dispatch(setApiLoading(false));
  }
};

export default apiCall;

export const useApiCall = <T>({
  url: propUrl,
  params = {},
  data: sendedData = {},
  method = "get",
  shouldCallApi = true,
  formDataIsNeeded,
  queryOptions = {
    enabled: true,
    retry: 5,
    retryDelay: 10000,
    cacheTime: 100,
    staleTime: 600000,
  },
  loading = true,
  baseUrl,
}: useApiCallOptions) => {
  const apiUrl = shouldCallApi ? propUrl : "";

  const fetchData = async () => {
    return new Promise<any>((resolve, reject) => {
      if (shouldCallApi) {
        apiCall({
          baseUrl,
          url: apiUrl,
          params,
          data: sendedData,
          method,
          callback: (responseData, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(responseData);
            }
          },
          formDataIsNeeded,
          loading,
        });
      } else {
        resolve(null);
      }
    });
  };

  const { data, error, isLoading, refetch } = useQuery<T, Error>(
    apiUrl,
    fetchData,
    queryOptions
  );

  return { data, error, isLoading, refetch };
};
