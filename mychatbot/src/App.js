import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ChatGPTDashboard from './components/dashboard/ChatBotDashboard';

function App() {
  return (
    <Provider store={store}>
      <ChatGPTDashboard />
    </Provider>
  );
}

export default App;
