import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AddMessage from './components/AddMessage';
import ChatMessages from './components/ChatMessages';
import './App.css';

function App() {
  const [nameEntered, enterName] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    enterName(e.target[0].value);
  };

  return (
    <div className='App'>
      {nameEntered ? (
        <div style={{ textAlign: 'center' }}>
          <h1>{nameEntered}'s Messages</h1>
          <hr />
          <ChatMessages />
          <AddMessage messenger={nameEntered} />
        </div>
      ) : (
        <Form
          style={{ maxWidth: '75%', display: 'inline-block' }}
          onSubmit={handleOnSubmit}
        >
          <br />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder='Enter name' />
          </Form.Group>
          <br />
          <Button variant='primary' type='submit'>
            Enter
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
