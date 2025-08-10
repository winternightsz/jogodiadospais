/**
 * Persistência de dados usando localStorage
 */

const STORAGE_KEYS = {
  DIFFICULTY: 'ws_difficulty',
  WORDS: 'ws_words',
  FOUND_WORDS: 'ws_found'
};

/**
 * Salva dados no localStorage com tratamento de erro
 */
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Erro ao salvar no localStorage:', error);
    return false;
  }
}

/**
 * Carrega dados do localStorage com tratamento de erro
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
}

/**
 * Salva a dificuldade do jogo
 */
export function saveDifficulty(difficulty) {
  return saveToStorage(STORAGE_KEYS.DIFFICULTY, difficulty);
}

/**
 * Carrega a dificuldade salva
 */
export function loadDifficulty() {
  return loadFromStorage(STORAGE_KEYS.DIFFICULTY, 'normal');
}

/**
 * Salva a lista de palavras
 */
export function saveWords(words) {
  return saveToStorage(STORAGE_KEYS.WORDS, words);
}

/**
 * Carrega a lista de palavras salva
 */
export function loadWords() {
  return loadFromStorage(STORAGE_KEYS.WORDS, [
    "PAI", "AMOR", "FAMILIA", "CARINHO", "ABRACO", 
    "EXEMPLO", "FORCA", "CUIDADO", "RISOS", "RESPEITO"
  ]);
}

/**
 * Salva as palavras encontradas
 */
export function saveFoundWords(foundWords) {
  return saveToStorage(STORAGE_KEYS.FOUND_WORDS, foundWords);
}

/**
 * Carrega as palavras encontradas salvas
 */
export function loadFoundWords() {
  return loadFromStorage(STORAGE_KEYS.FOUND_WORDS, []);
}

/**
 * Limpa todos os dados salvos
 */
export function clearStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.warn('Erro ao limpar localStorage:', error);
    return false;
  }
}
