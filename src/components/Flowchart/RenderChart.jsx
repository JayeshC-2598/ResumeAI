import mermaid from "mermaid";
import React, { useEffect, useLayoutEffect } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "monospace",
});

function RenderChart({ chart, SaveFlow }) {

  useEffect(() => {
    document.getElementById("mm")?.removeAttribute("data-processed");
    Refresh();
  }, [chart]);

  const Refresh = () => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "monospace",
    });
    mermaid.contentLoaded();
  };

  return (
    <div className="w-full h-full #max-h-[calc(100svh_-_8rem)] relative rounded-md overflow-hidden bg-white">
      <button className="absolute top-2 right-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 flex items-center gap-1 group" onClick={() => Refresh()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="group-active:animate-[spin_0.25s_ease-in-out]" width={18} height={18} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path></svg>
        <span className="mb-0.5">
          Refresh
        </span>
      </button>
      <pre id="mm" className="mermaid min-h-full max-h-[calc(100svh_-_8rem)] flex justify-center">{`${chart}`}</pre>
      <button className="absolute top-14 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 flex items-center gap-1 group" onClick={() => SaveFlow()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="group-active:scale-95 transition-all" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2M7 5h4v2h2V5h2v4H7zm0 8h10v6H7z"></path></svg>
        <span className="mb-0.5">
          Save
        </span>
      </button>
    </div>
  );
}

export default RenderChart;