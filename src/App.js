import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Hold, Home, Home2, Home3, Album, Dashboard, ScriptBD } from './pages/index'
// import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layout2" element={<Home2 />} />
        <Route path="/layout3" element={<Home3 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/album" element={<Album />} />
        <Route path="/script" element={<ScriptBD />} />
        <Route path="/hold" element={<Hold />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Analytics /> */}
    </>
  );
}

export default App;
