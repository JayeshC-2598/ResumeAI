import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

const Preview = ({ markdown,pdfRef }) => {
  return (
    <div className="flex-1 p-5 w-full overflow-x-auto -max-h-[calc(100vh_-_4rem)] md:max-h-none">
      <div className="-min-w-[600px] w-full" ref={pdfRef}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          className={
            "max-w-none prose prose-sm prose-slate [&_pre]:bg-gray-200 [&_pre]:overflow-clip [&_pre]:text-slate-700 "
          }
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

export default Preview;
