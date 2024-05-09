import React from 'react';
import JournalCategoryEditAndAdd from './JournalCategoryEditAndAdd';
import JournalAddPost from './JournalAddPost';
import JournalEditPost from './JournalEditPost';

const JournalPanel = () => {
  return (
    <div>
      <JournalCategoryEditAndAdd />
      <JournalAddPost />
      <JournalEditPost />
    </div>
  );
};

export default JournalPanel;
