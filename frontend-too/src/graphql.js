import { gql } from '@apollo/client';

export const ADD_MESSAGE = gql`
  mutation Mutation($from: String!, $message: String!) {
    sendMessage(from: $from, message: $message) {
      from
      message
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription Subscription {
    messageSent {
      id
      from
      message
    }
  }
`;

export const CHAT_MESSAGES = gql`
  query Query {
    chats {
      id
      from
      message
    }
  }
`;
