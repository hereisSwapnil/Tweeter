import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme.isDarkMode) ? "dark" : "light";

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-200">
      <div className="max-w-[1265px] mx-auto flex min-h-screen">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-[275px] sticky top-0 h-screen px-2 border-r border-light-border dark:border-dark-border">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow max-w-[600px] w-full border-r border-light-border dark:border-dark-border min-h-screen">
          <div className="sticky top-0 z-50 backdrop-blur-md bg-light-bg/80 dark:bg-dark-bg/80 border-b border-light-border dark:border-dark-border">
             <Header />
          </div>
          {children}
        </main>

        {/* Right Sidebar (Desktop - Placeholder for now) */}
        <aside className="hidden lg:flex flex-col w-[350px] pl-8 sticky top-0 h-screen pt-4">
           {/* Search and Trends can go here */}
           <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 min-h-[200px]">
              <h2 className="font-bold text-xl mb-4">What's happening</h2>
              <p className="text-gray-500">Trending content coming soon...</p>
           </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation (To be implemented or integrated from existing) */}
      <div className="md:hidden fixed bottom-0 w-full bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border z-50 pb-safe">
         {/* Reuse Sidebar or create a specific mobile nav here if Sidebar isn't responsive enough */}
         <Sidebar mobile={true} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
};

export default Layout;
