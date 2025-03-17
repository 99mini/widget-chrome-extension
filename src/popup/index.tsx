import React from 'react';

const Popup = () => {
  return (
    <main className="flex flex-col min-w-[320px] p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-black-500">Widget Chrome Extension</h1>
      </div>
      <div className="flex flex-col justify-end">
        <a
          className="text-gray-500 text-sm hover:underline hover:text-gray-300 transition"
          href="https://github.com/99mini/widget-chrome-extension"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <hr className="border-gray-300 my-2" />
        <div className="flex items-center gap-2">
          <div className="text-gray-500">Contact</div>
          <a
            className="text-gray-500 text-sm hover:underline hover:text-gray-300 transition"
            href="mailto:0mini9939@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            0mini9939@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
};
export default Popup;
