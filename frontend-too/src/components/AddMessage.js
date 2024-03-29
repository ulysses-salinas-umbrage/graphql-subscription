import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';

const ADD_MESSAGE = gql`
  mutation Mutation($from: String!, $message: String!) {
    sendMessage(from: $from, message: $message) {
      from
      message
    }
  }
`;

const AddMessage = props => {
  let input;
  const [sendMessage, { data, loading, error }] = useMutation(ADD_MESSAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Form
        style={{ maxWidth: '75%', display: 'inline-block' }}
        onSubmit={e => {
          e.preventDefault();
          sendMessage({
            variables: { from: props.messenger, message: input.value },
          });
          input.value = '';
        }}
      >
        <Form.Group>
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            ref={node => {
              input = node;
            }}
            placeholder='Enter message'
          />
        </Form.Group>
        <br />
        <Button variant='primary' type='submit'>
          Enter
        </Button>
      </Form>
    </div>
  );
};

export default AddMessage;
