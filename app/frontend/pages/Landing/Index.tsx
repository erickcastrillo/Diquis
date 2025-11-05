import { Head } from "@inertiajs/react";
import React, { Fragment, useEffect, useState } from "react";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Pricing from "./Pricing";

const LandingPage: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage, default to false (light theme)
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    // Apply theme immediately on mount
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const theme = newTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };
  return (
    <Fragment>
      <Head title="Diquis Football | Home" />
      <div className="bg-base-100">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <main>
          <Hero />
          <Features />
          <Pricing />
        </main>

        <Footer />
      </div>
    </Fragment>
  );
};

export default LandingPage;
