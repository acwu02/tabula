import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Form from './Form';
import Board from './Board';
import '../css/App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    displayContent(user);
  };

  const displayContent = (user) => {
    // TODO
  };

  return (
    <div id="app">
      {user && <Sidebar/>}
      {!user && <Form onLogin={handleLogin}/>}
      <Board user={user} displayContent={displayContent}/>
    </div>
  );
}

export default App;