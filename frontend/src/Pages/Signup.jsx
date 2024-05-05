import React from "react";
import SignUpCard from "../components/SignUpCard";

const Signup = ({ setPageRoute }) => {
  return (
    <div className="h-auto flex flex-row justify-center items-center">
      <SignUpCard setPageRoute={setPageRoute} />
    </div>
  );
};

export default Signup;
