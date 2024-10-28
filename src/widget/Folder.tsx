import React from 'react';

type FolderProps = {
  children: React.ReactNode;
};

const Folder: React.FC<FolderProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Folder;
