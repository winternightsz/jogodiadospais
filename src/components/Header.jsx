import React from 'react';

export default function Header() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">
            Caça-Palavras
          </h1>
          <p className="text-lg sm:text-xl text-center text-indigo-100 font-medium">
            Dia dos Pais
          </p>
        </div>
      </div>
    </div>
  );
}
