import React, { useState, useEffect } from 'react';

export default function Controls({ 
  difficulty, 
  onDifficultyChange, 
  onNewGame, 
  onEditWords, 
  onHint 
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('ws_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ws_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ws_theme', 'light');
    }
  };

  const difficulties = [
    { key: 'easy', label: 'Fácil' },
    { key: 'normal', label: 'Normal' },
    { key: 'hard', label: 'Difícil' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800/70 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4 md:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
        Controles
      </h3>
      
      {/* Dificuldade */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
          Dificuldade
        </label>
        <div className="flex rounded-xl border border-slate-300 dark:border-slate-600 p-1 bg-slate-50 dark:bg-slate-700">
          {difficulties.map((diff) => (
            <button
              key={diff.key}
              onClick={() => onDifficultyChange(diff.key)}
              aria-pressed={difficulty === diff.key}
              className={`flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                difficulty === diff.key
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={onNewGame}
          className="w-full inline-flex items-center justify-center gap-2 px-3 sm:px-4 h-10 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-50 transition-colors duration-200 text-sm sm:text-base mobile-touch-friendly"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Nova Partida
        </button>

        <button
          onClick={onEditWords}
          className="w-full px-3 sm:px-4 h-10 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors duration-200 text-sm sm:text-base mobile-touch-friendly"
        >
          Editar Palavras
        </button>

        <button
          onClick={onHint}
          className="w-full px-3 h-10 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors duration-200 text-sm sm:text-base mobile-touch-friendly"
        >
          💡 Dica
        </button>
      </div>

      {/* Toggle Dark Mode */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={toggleDarkMode}
          className="w-full inline-flex items-center justify-center gap-2 px-3 h-10 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors duration-200 text-sm sm:text-base mobile-touch-friendly"
          aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {isDark ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Modo Claro
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Modo Escuro
            </>
          )}
        </button>
      </div>
    </div>
  );
}
