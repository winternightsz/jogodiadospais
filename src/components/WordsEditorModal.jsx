import React, { useState, useEffect, useRef } from 'react';

export default function WordsEditorModal({ isOpen, onClose, words, onSave }) {
  const [editedWords, setEditedWords] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEditedWords(words.join('\n'));
      // Focar no textarea quando abrir
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, words]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevenir scroll do body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const wordList = editedWords
        .split('\n')
        .map(word => word.trim())
        .filter(word => word.length > 0);
      
      await onSave(wordList);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar palavras:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 
            id="modal-title"
            className="text-xl font-bold text-slate-900 dark:text-slate-100"
          >
            Editar Palavras
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            aria-label="Fechar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p 
          id="modal-description"
          className="text-slate-600 dark:text-slate-400 mb-4"
        >
          Digite uma palavra por linha. As palavras serão normalizadas automaticamente (maiúsculas, sem acentos).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="words-textarea" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Lista de Palavras
            </label>
            <textarea
              ref={textareaRef}
              id="words-textarea"
              value={editedWords}
              onChange={(e) => setEditedWords(e.target.value)}
              className="w-full h-56 rounded-xl border border-slate-300 dark:border-slate-600 p-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="PAI&#10;AMOR&#10;FAMILIA&#10;CARINHO&#10;ABRACO"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 h-10 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 h-10 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-50 transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
