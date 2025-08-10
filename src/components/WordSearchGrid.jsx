import React, { useState, useRef, useEffect } from 'react';
import { isValidWord, isStraightLine } from '../lib/grid.js';

export default function WordSearchGrid({ 
  grid, 
  words, 
  foundWords, 
  onWordFound,
  hintPosition,
  showHint,
  isCellFound,
  difficulty
}) {
  const [selectionPath, setSelectionPath] = useState([]);
  const [firstClick, setFirstClick] = useState(null);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });
  const gridRef = useRef(null);

  // Função para verificar se uma célula está na seleção atual
  const isInSelection = (row, col) => {
    return selectionPath && Array.isArray(selectionPath) && selectionPath.some(pos => pos.row === row && pos.col === col);
  };

  // Função para obter classes CSS de uma célula
  const getCellClasses = (row, col) => {
    let classes = [
      'w-8 h-8 sm:w-10 sm:h-10 border border-slate-300 dark:border-slate-600',
      'flex items-center justify-center',
      'text-sm sm:text-lg font-bold cursor-pointer',
      'transition-all duration-200',
      'select-none'
    ];

    // Verificar se é uma célula encontrada
    if (typeof isCellFound === 'function' && isCellFound(row, col)) {
      classes.push('bg-green-500 text-white');
    }
    // Verificar se é uma célula destacada temporariamente
    else if (highlightedWord && highlightedWord.some(pos => pos.row === row && pos.col === col)) {
      classes.push('bg-blue-500 text-white animate-pulse');
    }
    // Verificar se é a primeira letra clicada
    else if (firstClick && firstClick.row === row && firstClick.col === col) {
      classes.push('bg-yellow-400 text-slate-900');
    }
    // Verificar se está na seleção atual
    else if (selectionPath && Array.isArray(selectionPath) && selectionPath.some(pos => pos.row === row && pos.col === col)) {
      classes.push('bg-blue-300 text-slate-900 dark:bg-blue-600 dark:text-white');
    }
    // Verificar se é uma dica
    else if (typeof hintPosition === 'object' && hintPosition && hintPosition.row === row && hintPosition.col === col && showHint) {
      classes.push('bg-purple-400 text-white animate-bounce');
    }
    // Verificar se é a célula focada
    else if (focusedCell.row === row && focusedCell.col === col) {
      classes.push('ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900');
      classes.push('bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100');
    }
    // Célula normal
    else {
      classes.push('bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100');
      classes.push('hover:bg-slate-100 dark:hover:bg-slate-700');
    }

    return classes.join(' ');
  };

  // Função para verificar se uma célula é dica
  const isHint = (row, col) => {
    return showHint && hintPosition && typeof hintPosition === 'object' && hintPosition.row === row && hintPosition.col === col;
  };

  // Função para gerar o caminho entre dois pontos
  const generatePath = (start, end) => {
    if (!start || !end || typeof start !== 'object' || typeof end !== 'object' || 
        start.row === undefined || start.col === undefined || 
        end.row === undefined || end.col === undefined) {
      return null;
    }
    
    const dx = end.col - start.col;
    const dy = end.row - start.row;
    
    // Verificar se é uma linha reta
    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
      return null;
    }
    
    // Calcular o número de passos
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    if (steps === 0) return null;
    
    // Calcular incrementos
    const stepX = dx / steps;
    const stepY = dy / steps;
    
    // Gerar o caminho
    const path = [];
    for (let i = 0; i <= steps; i++) {
      const row = start.row + (i * stepY);
      const col = start.col + (i * stepX);
      path.push({ row: Math.round(row), col: Math.round(col) });
    }
    
    return path;
  };

  // Função para obter a palavra a partir de um caminho
  const getWordFromPath = (path) => {
    if (!path || !Array.isArray(path) || path.length < 2 || !grid || !Array.isArray(grid)) {
      return null;
    }
    
    let word = '';
    for (const pos of path) {
      if (grid[pos.row] && grid[pos.row][pos.col]) {
        word += grid[pos.row][pos.col];
      }
    }
    return word;
  };

  // Event handler para clique nas células
  const handleCellClick = (row, col) => {
    if (!grid || !Array.isArray(grid) || !words || !Array.isArray(words)) return;
    
    if (!firstClick) {
      // Primeira letra clicada
      setFirstClick({ row, col });
      setSelectionPath([{ row, col }]);
    } else {
      // Segunda letra clicada - verificar se forma uma palavra válida
      if (firstClick.row === row && firstClick.col === col) {
        // Mesmo ponto - cancelar seleção
        setFirstClick(null);
        setSelectionPath([]);
        return;
      }
      
      // Gerar caminho entre os dois pontos
      const path = generatePath(firstClick, { row, col });
      
      if (path && path.length >= 2) {
        // Verificar se forma uma palavra válida
        const selectedWord = getWordFromPath(path);
        if (selectedWord && words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
          // Palavra encontrada - destacar temporariamente
          setHighlightedWord(path);
          
          // Chamar callback para marcar palavra como encontrada
          onWordFound(selectedWord);
          
          // Reverter destaque após 2 segundos
          setTimeout(() => {
            setHighlightedWord(null);
          }, 2000);
        } else {
          // Palavra inválida - mostrar caminho por um momento
          setSelectionPath(path);
          setTimeout(() => {
            setSelectionPath([]);
          }, 500);
        }
      }
      
      // Resetar seleção
      setFirstClick(null);
      setSelectionPath([]);
    }
  };

  // Touch events are handled automatically by the browser's click event synthesis

  // Navegação por teclado
  const handleKeyDown = (e, row, col) => {
    e.preventDefault();
    
    if (!grid || !Array.isArray(grid) || !grid[row] || !Array.isArray(grid[row])) {
      return;
    }
    
    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) setFocusedCell({ row: row - 1, col });
        break;
      case 'ArrowDown':
        if (row < grid.length - 1) setFocusedCell({ row: row + 1, col });
        break;
      case 'ArrowLeft':
        if (col > 0) setFocusedCell({ row, col: col - 1 });
        break;
      case 'ArrowRight':
        if (col < grid[row].length - 1) setFocusedCell({ row, col: col + 1 });
        break;
      case 'Enter':
      case ' ':
        handleCellClick(row, col);
        break;
    }
  };

  // Limpar seleção quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gridRef.current && !gridRef.current.contains(event.target)) {
        setFirstClick(null);
        setSelectionPath([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Verificar se o grid está inicializado (após todos os hooks)
  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800/70 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center text-slate-600 dark:text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Carregando grid...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/70 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4 md:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 text-center">
        Modo: {difficulty === 'easy' ? 'Fácil' : difficulty === 'normal' ? 'Normal' : 'Difícil'}
      </h3>
      
      <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
        {!firstClick ? (
          "Clique na primeira letra da palavra"
        ) : (
          "Agora clique na última letra da palavra"
        )}
      </div>
      
      <div className="flex justify-center">
        <div 
          ref={gridRef}
          className="inline-grid gap-0 border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${grid[0] && grid[0].length ? grid[0].length : 0}, 1fr)`
          }}
        >
          {grid.map((row, rowIndex) =>
            Array.isArray(row) ? row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${getCellClasses(rowIndex, colIndex)} mobile-touch-friendly`}
                aria-label={`linha ${rowIndex + 1}, coluna ${colIndex + 1}, letra ${cell}`}
                tabIndex={0}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
              >
                {cell}
              </div>
            )) : null
          )}
        </div>
      </div>
      
      {selectionPath && Array.isArray(selectionPath) && selectionPath.length > 0 && (
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
          {selectionPath.map(pos => grid[pos.row] && grid[pos.row][pos.col] ? grid[pos.row][pos.col] : '').join('')}
        </div>
      )}
    </div>
  );
}
