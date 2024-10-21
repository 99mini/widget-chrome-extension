import React from 'react';

import Clock from '@/widget/Clock';
import Todo from '@/widget/Todo';

const NewTab: React.FC = () => {
  return (
    <div>
      <Todo />
      <Clock />
    </div>
  );
};

export default NewTab;
