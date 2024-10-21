import React from 'react';

import Clock from './Clock';
import Todo from './Todo';

const NewTab: React.FC = () => {
  return (
    <div>
      <Todo />
      <Clock />
    </div>
  );
};

export default NewTab;
