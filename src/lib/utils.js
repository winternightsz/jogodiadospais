/**
 * Utilitários para o jogo Caça-Palavras
 */

/**
 * Gera um número inteiro aleatório entre min e max (inclusive)
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Escolhe um elemento aleatório de um array
 */
export function choice(array) {
  return array[randomInt(0, array.length - 1)];
}

/**
 * Embaralha um array usando Fisher-Yates
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Remove duplicatas de um array baseado em uma propriedade
 */
export function uniqueBy(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Verifica se dois arrays têm os mesmos elementos (ordem não importa)
 */
export function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}

/**
 * Calcula a distância entre dois pontos
 */
export function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.row - p1.row, 2) + Math.pow(p2.col - p1.col, 2));
}

/**
 * Verifica se um caminho é uma linha reta
 */
export function isStraightLine(path) {
  if (path.length < 2) return true;
  
  const first = path[0];
  const last = path[path.length - 1];
  
  // Calcular direção base
  const dx = last.col - first.col;
  const dy = last.row - first.row;
  
  // Se dx e dy são ambos 0, não é uma linha válida
  if (dx === 0 && dy === 0) return false;
  
  // Verificar se todos os pontos estão na mesma linha
  for (let i = 1; i < path.length - 1; i++) {
    const point = path[i];
    
    // Se é uma linha horizontal (dy = 0)
    if (dy === 0) {
      if (point.row !== first.row) return false;
    }
    // Se é uma linha vertical (dx = 0)
    else if (dx === 0) {
      if (point.col !== first.col) return false;
    }
    // Se é uma linha diagonal
    else {
      // Verificar se o ponto está na linha usando a equação da reta
      const expectedCol = first.col + (dx * (point.row - first.row)) / dy;
      if (Math.abs(point.col - expectedCol) > 0.1) return false;
    }
  }
  
  return true;
}
