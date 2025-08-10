/**
 * Algoritmos de geração do grid e utilitários
 */

import { randomInt, choice, shuffle, isStraightLine } from './utils.js';

// Re-exportar isStraightLine para uso em outros componentes
export { isStraightLine };

/**
 * Direções possíveis para colocação de palavras
 * Cada direção é um vetor {dx, dy} indicando o movimento
 */
export const DIRECTIONS = [
  { dx: 0, dy: -1, name: 'up' },           // ↑
  { dx: 1, dy: -1, name: 'up-right' },     // ↗
  { dx: 1, dy: 0, name: 'right' },         // →
  { dx: 1, dy: 1, name: 'down-right' },    // ↘
  { dx: 0, dy: 1, name: 'down' },          // ↓
  { dx: -1, dy: 1, name: 'down-left' },    // ↙
  { dx: -1, dy: 0, name: 'left' },         // ←
  { dx: -1, dy: -1, name: 'up-left' }      // ↖
];

/**
 * Configurações de dificuldade
 */
export const DIFFICULTY_CONFIG = {
  easy: {
    size: 10,
    allowedDirections: [2, 4], // apenas horizontal e vertical para frente (direita e baixo)
    name: 'Fácil'
  },
  normal: {
    size: 12,
    allowedDirections: [0, 1, 2, 3, 4, 5, 6, 7], // todas as direções
    name: 'Normal'
  },
  hard: {
    size: 14,
    allowedDirections: [0, 1, 2, 3, 4, 5, 6, 7], // todas as direções
    name: 'Difícil'
  }
};

/**
 * Normaliza uma palavra: converte para maiúsculas e remove acentos
 */
export function normalizeWord(word) {
  return word
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^A-Z]/g, ''); // Mantém apenas letras A-Z
}

/**
 * Verifica se uma palavra pode ser colocada em uma posição específica
 */
export function canPlaceAt(grid, word, startRow, startCol, direction) {
  const { dx, dy } = DIRECTIONS[direction];
  const wordLength = word.length;
  
  // Verificar se a palavra cabe nos limites do grid
  for (let i = 0; i < wordLength; i++) {
    const row = startRow + (i * dy);
    const col = startCol + (i * dx);
    
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return false;
    }
    
    // Verificar se a célula está vazia ou se a letra é compatível
    if (grid[row][col] !== null && grid[row][col] !== word[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Coloca uma palavra no grid
 */
export function applyPlacement(grid, word, startRow, startCol, direction) {
  const { dx, dy } = DIRECTIONS[direction];
  const wordLength = word.length;
  
  for (let i = 0; i < wordLength; i++) {
    const row = startRow + (i * dy);
    const col = startCol + (i * dx);
    grid[row][col] = word[i];
  }
  
  return {
    word,
    startRow,
    startCol,
    direction,
    positions: Array.from({ length: wordLength }, (_, i) => ({
      row: startRow + (i * dy),
      col: startCol + (i * dx)
    }))
  };
}

/**
 * Preenche células vazias com letras aleatórias A-Z
 */
export function randomFill(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        grid[row][col] = String.fromCharCode(65 + randomInt(0, 25)); // A-Z
      }
    }
  }
}

/**
 * Gera um grid com as palavras posicionadas
 */
export function generateGrid(words, difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const size = config.size;
  const allowedDirections = config.allowedDirections;
  
  // Criar grid vazio
  const grid = Array(size).fill(null).map(() => Array(size).fill(null));
  const placements = [];
  
  // Embaralhar palavras para melhor distribuição
  const shuffledWords = shuffle([...words]);
  
  // Tentar colocar cada palavra
  for (const word of shuffledWords) {
    const normalizedWord = normalizeWord(word);
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!placed && attempts < maxAttempts) {
      // Escolher posição e direção aleatória
      const startRow = randomInt(0, size - 1);
      const startCol = randomInt(0, size - 1);
      const direction = choice(allowedDirections);
      
      if (canPlaceAt(grid, normalizedWord, startRow, startCol, direction)) {
        const placement = applyPlacement(grid, normalizedWord, startRow, startCol, direction);
        placements.push(placement);
        placed = true;
      }
      
      attempts++;
    }
    
    // Se não conseguiu colocar, tentar em posições mais simples
    if (!placed) {
      for (let row = 0; row < size && !placed; row++) {
        for (let col = 0; col < size && !placed; col++) {
          for (const dir of allowedDirections) {
            if (canPlaceAt(grid, normalizedWord, row, col, dir)) {
              const placement = applyPlacement(grid, normalizedWord, row, col, dir);
              placements.push(placement);
              placed = true;
              break;
            }
          }
        }
      }
    }
  }
  
  // Preencher células vazias com letras aleatórias
  randomFill(grid);
  
  return { grid, placements };
}

/**
 * Converte um caminho de células em uma palavra
 */
export function pathToWord(grid, path) {
  if (!path || path.length === 0) return '';
  return path.map(pos => {
    if (pos.row >= 0 && pos.row < grid.length && pos.col >= 0 && pos.col < grid[0]?.length) {
      return grid[pos.row][pos.col];
    }
    return '';
  }).join('');
}

/**
 * Converte um caminho de células em uma palavra reversa
 */
export function pathToWordReverse(grid, path) {
  if (!path || path.length === 0) return '';
  return path.map(pos => {
    if (pos.row >= 0 && pos.row < grid.length && pos.col >= 0 && pos.col < grid[0]?.length) {
      return grid[pos.row][pos.col];
    }
    return '';
  }).reverse().join('');
}

/**
 * Verifica se um caminho forma uma palavra válida
 */
export function isValidWord(grid, path, words) {
  if (path.length < 2) return null;
  
  // Verificar se o caminho é uma linha reta
  if (!isStraightLine(path)) return null;
  
  const word = pathToWord(grid, path);
  const wordReverse = pathToWordReverse(grid, path);
  
  if (words.includes(word)) {
    return { word, isReverse: false };
  }
  
  if (words.includes(wordReverse)) {
    return { word: wordReverse, isReverse: true };
  }
  
  return null;
}
