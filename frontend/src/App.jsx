import { Route, Routes } from "react-router-dom";
import TestPage from "./Pages/TestPage";
import Header from "./components/Header";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("isDarkMode") === "true"
    );
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white text-black dark:bg-black dark:text-white flex-grow">
          <div className="max-w-[600px] m-auto min-h-screen my-5">
            <Header />
            <Routes>
              <Route path="/" element={<TestPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
