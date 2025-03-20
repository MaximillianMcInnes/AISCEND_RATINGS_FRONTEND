"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProcessingPopup: React.FC<ProcessingPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-[9999999999999999999999999999999999999999999999999999999999999999999999999999999999999]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Results Are Being Processed
            </h2>
            <p className="text-gray-600">
              This might take a few minutes. Feel free to grab a coffee while we
              prepare your report.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessingPopup;
