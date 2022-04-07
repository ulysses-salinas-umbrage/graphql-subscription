import React, { useEffect, useState } from 'react';
import { Card, Row, Container, Form } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { MESSAGES_SUBSCRIPTION, CHAT_MESSAGES } from '../graphql';

const ChatMessages = () => {
  const { subscribeToMore, loading, error, data } = useQuery(CHAT_MESSAGES);
  const [chats, setChats] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageSent;
        return {
          chats: [...prev.chats, newFeedItem],
        };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  const onChange = e => {
    const copies = [...data.chats];
    if (e.target.value !== '') {
      setChats(
        copies.map(copy => {
          let highlight = copy.message.replace(
            new RegExp(e.target.value, 'gi'),
            match =>
              `<mark style="background-color:yellow; padding:0em">${match}</mark>`
          );
          return {
            ...copy,
            message: highlight,
          };
        })
      );
    } else {
      setChats('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      {chats ? (
        <Row>
          {chats.map(chat => (
            <div
              key={chat.id}
              className='d-flex flex-wrap justify-content-around'
            >
              <Card
                className='d-flex mb-4'
                style={{ width: '10rem', height: '5rem' }}
              >
                <Card.Header style={{ color: 'red' }}>{chat.from}:</Card.Header>
                <p dangerouslySetInnerHTML={{ __html: chat.message }} />
              </Card>
            </div>
          ))}
        </Row>
      ) : (
        <Row>
          {data.chats.map(chat => (
            <div
              key={chat.id}
              className='d-flex flex-wrap justify-content-around'
            >
              <Card
                className='d-flex mb-4'
                style={{ width: '10rem', height: '5rem' }}
              >
                <Card.Header style={{ color: 'red' }}>{chat.from}:</Card.Header>
                <p>{chat.message}</p>
              </Card>
            </div>
          ))}
        </Row>
      )}
      <br />
      <h1>Filter Messages:</h1>
      <input type='text' placeholder='Filter messages' onChange={onChange} />

      <Form.Select onChange={onChange}>
        {data.chats.map((item, i) => (
          <option key={i}>{item.message}</option>
        ))}
      </Form.Select>
    </Container>
  );
};

export default ChatMessages;
