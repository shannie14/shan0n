import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Hold, Home, Album, Dashboard, ScriptBD } from './pages/index'
// import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
