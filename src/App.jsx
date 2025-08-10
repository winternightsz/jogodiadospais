import React from 'react';
import Game from './game/Game';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
        <Game />
      </div>
    </div>
  );
}
