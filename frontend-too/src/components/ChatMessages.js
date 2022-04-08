import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { MESSAGES_SUBSCRIPTION, CHAT_MESSAGES } from '../graphql';
import '../Styles/ChatMessages.css';
const ChatMessages = () => {
  const [filter, setFilter] = useState('');

  const { subscribeToMore, loading, error, data } = useQuery(CHAT_MESSAGES);

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

  const handleChange = e => {
    setFilter(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const determineClass = message => {
    if (message.match(filter) && filter !== '') {
      return 'filterBox';
    } else {
      return 'chatBox';
    }
  };

  return (
    <div className='chatsMessages'>
      <div className='chatBoxes'>
        {data.chats.map(chat => (
          <div key={chat.id} className={determineClass(chat.message)}>
            <h5>{chat.from}:</h5>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>

      <br />
      <h1>Filter Messages:</h1>
      <input list='select' name='select' onChange={handleChange} />
      <datalist
        className='form-control'
        id='select'
        style={{ display: 'none' }}
      >
        {data.chats.map((item, i) => (
          <option style={{ display: 'none' }} key={i}>
            {item.message}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default ChatMessages;
