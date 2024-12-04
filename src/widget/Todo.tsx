import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { syncGet, syncSet } from '@/chrome/storage';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background-color: #f00;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Todo: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    syncGet<string[]>('tasks').then((tasks) => {
      if (tasks) {
        setTasks(tasks);
      }
    });
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setTask('');

      syncSet('tasks', { newTasks });
    }
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    syncSet('tasks', { newTasks });
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
      />
      <List>
        {tasks.map((t, index) => (
          <ListItem key={index}>
            <div>{t}</div>
            <DeleteButton onClick={() => deleteTask(index)}>X</DeleteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Todo;
