import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../actions/chatActions';
import './ChatBotDashboard.css';

const ChatBotDashboard = () => {
  const [inputText, setInputText] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  const handleMessageSend = async () => {
    if (inputText.trim() !== '') {
      // Dispatch action to add user message to state immediately
      dispatch({ type: 'SEND_MESSAGE', payload: { text: inputText, sender: 'user' }});
      setInputText('');
      setIsGeneratingResponse(true);

      // Send user message to the API
      const responseData = await dispatch(sendMessage(inputText));

      // Dispatch action to update state with the response message
      if(responseData) {
        dispatch({ type: 'RECEIVE_MESSAGE', payload: responseData.message });
      }

      setIsGeneratingResponse(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {/* Render user's and chatbot's messages */}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {/* Show generating response message if isGeneratingResponse is true */}
        {isGeneratingResponse && (
          <div className="message chatbot">
            Generating response...
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          id='input'
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBotDashboard;
