import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Home.css';

const Home = () => {
  let navigate = useNavigate();
  let name = localStorage.getItem('name');
  useEffect(() => {
    if (name) {
      navigate('/chats');
    }
  });

  const handleOnSubmit = e => {
    localStorage.setItem('name', e.target[0].value);
  };
  return (
    <div className='homePage'>
      <h1>Welcome to Chats</h1>
      <div>
        <form
          style={{ maxWidth: '75%', display: 'inline-block' }}
          onSubmit={handleOnSubmit}
        >
          <br />
          <h4>Enter Name</h4>
          <input placeholder='Enter name' />
          <br />
          <br />
          <button variant='primary' type='submit'>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
