import React, { useEffect } from 'react';
import { Card, Row, Container } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

//put this in graphql.js
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
  //why does the gql query not have its own variable?
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
      //since you're only using the data portion of subscriptionData, you could destructure further like this:
      //updateQuery: (prev, { subscriptionData: { data } }) => {
      updateQuery: (prev, { subscriptionData }) => {
        //never leave console.logs in finished frontend code
        console.log('PREVIOUS!!!!', prev);
        console.log(subscriptionData.data);
        //this block could be changed to 
        //return !subscriptionData.data ? prev : { [...prev.chats, subscriptionData.data.messageSent] };
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
