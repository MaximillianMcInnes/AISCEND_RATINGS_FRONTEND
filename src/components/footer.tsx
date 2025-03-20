import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-black text-gray-300 py-4 flex flex-col items-center mt-[5rem]">
      <div className="flex items-center space-x-2">
        <span className="text-purple-500 font-bold text-2xl">A</span>
        <span className="text-lg">AIScend</span>
      </div>
      <div className="w-full border-t border-gray-600 my-4"></div>
      <p className="text-sm text-gray-400">
        &copy; 2024 AIScend™
      </p>
    </footer>
  );
};

export default FooterComponent;
