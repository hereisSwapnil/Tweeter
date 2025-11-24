import React from "react";
import SignUpCard from "../components/SignUpCard";

const Signup = ({ setPageRoute }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <SignUpCard setPageRoute={setPageRoute} />
    </div>
  );
};

export default Signup;
