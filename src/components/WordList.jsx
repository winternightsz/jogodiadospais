import React from 'react';

export default function WordList({ words, foundWords }) {
  return (
    <div className="bg-white dark:bg-slate-800/70 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Palavras para Encontrar
      </h3>
      
      {/* Barra de progresso */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
          <span>Progresso</span>
          <span>{foundWords.length}/{words.length}</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(foundWords.length / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lista de palavras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {words.map((word) => {
          const isFound = foundWords.includes(word);
          return (
            <div
              key={word}
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium transition-all duration-200 ${
                isFound
                  ? 'bg-emerald-100 text-emerald-800 line-through'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}
