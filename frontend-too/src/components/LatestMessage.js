import React from 'react';
import { useSubscription, gql } from '@apollo/client';

const MESSAGES_SUBSCRIPTION = gql`
  subscription Subscription {
    messageSent {
      id
      from
      message
    }
  }
`;
const LatestMessage = id => {
  const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { id },
  });
  return <h4>New Message: {!loading && data.messageSent.message}</h4>;
};

export default LatestMessage;
