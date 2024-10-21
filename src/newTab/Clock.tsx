import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
`;

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Container>{time}</Container>;
};

export default Clock;
