import React from 'react';
import ForumCategoryEditAndAdd from './ForumCategoryEditAndAdd';
import ForumAddPost from './ForumAddPost';
import ForumEditPost from './ForumEditPost';

const ForumPanel = () => {
  return (
    <div>
      <ForumCategoryEditAndAdd />
      <ForumAddPost />
      <ForumEditPost />
    </div>
  );
};

export default ForumPanel;
