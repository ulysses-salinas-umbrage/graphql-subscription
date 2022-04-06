import React, { useEffect } from 'react';
import { Card, Row, Container } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

const MESSAGES_SUBSCRIPTION = gql`
  subscription Subscription {
    messageSent {
      id
      from
      message
    }
  }
`;
const ChatMessages = () => {
  const { subscribeToMore, loading, error, data } = useQuery(gql`
    {
      chats {
        id
        from
        message
      }
    }
  `);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('PREVIOUS!!!!', prev);
        console.log(subscriptionData.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
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
    </Container>
  );
};

export default ChatMessages;
