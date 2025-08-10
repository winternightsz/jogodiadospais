import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import WordList from '../components/WordList';
import WordSearchGrid from '../components/WordSearchGrid';
import WordsEditorModal from '../components/WordsEditorModal';
import { generateGrid } from '../lib/grid';
import { saveToStorage, loadFromStorage } from '../lib/storage';

export default function Game() {
  const [difficulty, setDifficulty] = useState('normal');
  const [words, setWords] = useState([
    "PAI", "AMOR", "FAMILIA", "CARINHO", "ABRACO", 
    "EXEMPLO", "FORCA", "CUIDADO", "RISOS", "RESPEITO"
  ]);
  const [foundWords, setFoundWords] = useState([]);
  const [grid, setGrid] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showModal, setShowModal] = useState(false);
  const [hintPosition, setHintPosition] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    const savedDifficulty = loadFromStorage('ws_difficulty');
    const savedWords = loadFromStorage('ws_words');
    const savedFoundWords = loadFromStorage('ws_foundWords');
    
    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedWords && savedWords.length > 0) setWords(savedWords);
    if (savedFoundWords) setFoundWords(savedFoundWords);
  }, []);

  // Gerar grid quando dificuldade ou palavras mudarem
  useEffect(() => {
    if (words.length > 0) {
      const result = generateGrid(words, difficulty);
      setGrid(result.grid);
      setPlacements(result.placements);
      setFoundWords([]);
      setGameStatus('playing');
    }
  }, [difficulty, words]);

  // Salvar dados quando mudarem
  useEffect(() => {
    saveToStorage('ws_difficulty', difficulty);
    saveToStorage('ws_words', words);
    saveToStorage('ws_foundWords', foundWords);
  }, [difficulty, words, foundWords]);

  // Verificar vitória
  useEffect(() => {
    if (foundWords.length === words.length && words.length > 0) {
      setGameStatus('won');
    }
  }, [foundWords, words]);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleNewGame = () => {
    const result = generateGrid(words, difficulty);
    setGrid(result.grid);
    setPlacements(result.placements);
    setFoundWords([]);
    setGameStatus('playing');
    setHintPosition(null);
    setShowHint(false);
  };

  const handleEditWords = () => {
    setShowModal(true);
  };

  const handleSaveWords = async (newWords) => {
    // Normalizar palavras (maiúsculas, sem acentos)
    const normalizedWords = newWords.map(word => 
      word
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Z]/g, '')
    ).filter(word => word.length > 0);
    
    setWords(normalizedWords);
    setFoundWords([]);
    setGameStatus('playing');
  };

  const handleHint = () => {
    const unfoundWords = words.filter(word => !foundWords.includes(word));
    if (unfoundWords.length === 0) return;

    // Escolher uma palavra aleatória não encontrada
    const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
    
    // Encontrar a posição exata da primeira letra da palavra no grid
    // usando as informações de placements para garantir que é a letra correta
    const wordPlacement = placements.find(placement => placement.word === randomWord);
    
    if (wordPlacement) {
      // Usar a posição exata da primeira letra da palavra
      setHintPosition({ 
        row: wordPlacement.startRow, 
        col: wordPlacement.startCol 
      });
      setShowHint(true);
      
      // Esconder a dica após 3 segundos
      setTimeout(() => {
        setShowHint(false);
        setHintPosition(null);
      }, 3000);
    }
  };

  const handleWordFound = (word) => {
    if (!foundWords.includes(word)) {
      setFoundWords(prev => [...prev, word]);
    }
  };

  const isCellFound = (row, col) => {
    // Verificar se a célula faz parte de uma palavra encontrada
    // Esta é uma implementação simplificada - você pode melhorar conforme necessário
    return false;
  };

  const handlePlayAgain = () => {
    handleNewGame();
  };

  return (
    <div className="space-y-6">
      <Header />
      
      {/* Layout responsivo com grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Painel principal (tabuleiro) */}
        <div className="md:col-span-8">
          <WordSearchGrid
            grid={grid}
            words={words}
            foundWords={foundWords}
            onWordFound={handleWordFound}
            hintPosition={hintPosition}
            showHint={showHint}
            isCellFound={isCellFound}
            difficulty={difficulty}
          />
        </div>

        {/* Painel lateral (controles e lista) */}
        <div className="md:col-span-4 space-y-6">
          <Controls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={handleNewGame}
            onEditWords={handleEditWords}
            onHint={handleHint}
          />
          
          <WordList
            words={words}
            foundWords={foundWords}
          />
        </div>
      </div>

      {/* Modal de edição de palavras */}
      <WordsEditorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        words={words}
        onSave={handleSaveWords}
      />

      {/* Modal de vitória */}
      {gameStatus === 'won' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Parabéns!
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Você encontrou todas as {words.length} palavras!
              </p>
            </div>
            
            <button
              onClick={handlePlayAgain}
              className="w-full px-6 h-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors duration-200 font-semibold"
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
