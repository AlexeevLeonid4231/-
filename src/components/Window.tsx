import React, { useState, useRef, MouseEvent } from 'react';
import { AppWindow } from '../types';

interface WindowProps {
  window: AppWindow;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
}

export default function Window({ window, onClose, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    onFocus(window.id);
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute border border-[#33ff33] bg-[#001400]/95 flex flex-col pointer-events-auto select-none shadow-[0_0_15px_rgba(0,50,0,0.5)] backdrop-blur-sm"
      style={{
        left: position.x,
        top: position.y,
        zIndex: window.zIndex,
        width: '320px',
        maxHeight: '400px',
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      <div 
        className="flex items-center justify-between border-b border-[#33ff33] px-3 py-1 cursor-move active:bg-[#113311]"
        onMouseDown={handleMouseDown}
      >
        <span className="text-[10px] uppercase font-bold text-[#33ff33] text-glow overflow-hidden whitespace-nowrap overflow-ellipsis mr-2 tracking-wider">
          {window.title}
        </span>
        <button
          className="text-[#33ff33] text-glow hover:bg-[#33ff33] hover:text-black focus:outline-none transition-colors px-1 border border-transparent hover:border-black text-[10px] uppercase font-bold"
          onClick={(e) => {
            e.stopPropagation();
            onClose(window.id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          [X]
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 text-[11px] text-[#33ff33] text-glow leading-relaxed select-text" onMouseDown={(e) => e.stopPropagation()}>
        {window.content}
      </div>
      
      {isDragging && (
        <div 
           className="fixed inset-0 z-50 cursor-move" 
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
        />
      )}
    </div>
  );
}
