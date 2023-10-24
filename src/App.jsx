import Header from './components/Header';

import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Board from './pages/Board';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="boards/:id" element={<Board />}></Route>
      </Routes>
    </>
  );
}

export default App;
