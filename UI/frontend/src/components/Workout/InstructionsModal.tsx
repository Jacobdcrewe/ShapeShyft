import React from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full z-50">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Finish Workout
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
