import React from 'react';
import Desktop from './components/Desktop';

export default function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black overflow-hidden font-mono text-[#33ff33] selection:bg-[#33ff33] selection:text-black">
      <div className="relative bg-[#050a05] screen-container crt overflow-hidden crt-app-container">
        <Desktop />
      </div>
    </div>
  );
}
