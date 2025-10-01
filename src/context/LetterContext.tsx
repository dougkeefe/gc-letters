import React, { createContext, useContext } from 'react';
import { jsPDF } from 'jspdf';
import { LetterContext as LetterContextType } from '../types';

interface LetterContextValue extends LetterContextType {
  pdf: jsPDF;
  currentY: number;
  setCurrentY: (y: number) => void;
  pageHeight: number;
  pageWidth: number;
}

const LetterContext = createContext<LetterContextValue | null>(null);

export const useLetterContext = () => {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error(
      'Letter components must be used within a GcLetter component'
    );
  }
  return context;
};

export const LetterProvider: React.FC<{
  value: LetterContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <LetterContext.Provider value={value}>{children}</LetterContext.Provider>
  );
};
