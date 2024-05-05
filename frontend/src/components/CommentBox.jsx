import React from "react";

const CommentBox = () => {
  return (
    <div className="flex flex-row py-5 border-b-[1px] gap-4 justify-between md:text-md text-sm dark:border-b-[#ffffff2a] border-b-[#0000002a] align-middle items-center">
      <div className="flex flex-row w-full gap-4">
        <label htmlFor="comment">👋</label>
        <input
          type="text"
          name="comment"
          className="w-full appearance-none border-none bg-transparent focus:outline-0"
          placeholder="Get the app or click here to download"
        />
      </div>
      <button className="dark:bg-[#ffffff1c] md:text-md text-sm bg-[#0000001c] hover:bg-[#00000030] dark:hover:bg-[#ffffff30] px-3 py-2 rounded-lg cursor-pointer">
        Get
      </button>
    </div>
  );
};

export default CommentBox;
