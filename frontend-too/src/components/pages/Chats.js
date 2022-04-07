import React, { useEffect } from 'react';
import AddMessage from '../AddMessage';
import ChatMessages from '../ChatMessages';
import { useNavigate } from 'react-router-dom';

const Chats = () => {
  let navigate = useNavigate();
  let name = localStorage.getItem('name');
  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  });

  return (
    <div>
      <h1>{name}'s Messages:</h1>
      <hr/>
      <ChatMessages />
      <AddMessage />
    </div>
  );
};

export default Chats;
