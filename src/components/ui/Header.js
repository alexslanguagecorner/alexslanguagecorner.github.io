import React, { useState, useEffect } from "react";
import "./Header.scss";
import { motion, AnimatePresence } from "framer-motion";

const DESKTOP_BREAKPOINT = 768;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // single source of truth for menu items
  const menuItems = [
    { label: "Home", href: "#", id: "hero-section" },
    { label: "About Me", href: "#", id: "hero-section" },
    { label: "Contact", href: "#", id: "contact-section" },
    { label: "Book a Lesson", href: "#", id: "buy-lessons-revolut" },
  //  { label: "Grammar Tips", href: "#" },
    { label: "Vocabulary Search", href: "#", id: "vocabulary-search" },
  ];

  // split to keep a left / right desktop layout
  const leftItems = menuItems.slice(0, 3);
  const rightItems = menuItems.slice(3);

  // ensure overlay is closed if we resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    // run once (in case page loads > breakpoint)
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <header className="header">
      
      <nav className="menu">
        {leftItems.map((it, i) => (
          <div
            onClick={() => {
              document.getElementById(it.id)
              ?.scrollIntoView({behavior: "smooth"});
            }}
            key={i} className="menu-btn" 
          >
            {it.label}
          </div>
        ))}
      </nav>

      {/* Burger Button */}
      <button
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* desktop right buttons */}
      <div className="buttons">
        {rightItems.map((it, i) => (
          <div 
            onClick={() => {
              document.getElementById(it.id)
              ?.scrollIntoView({behavior: "smooth"});
            }}
            key={i} className="menu-btn"
          >
            {it.label}
          </div>
        ))}
      </div>

      {/*Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="mobile-overlay"
          >
            {menuItems.map((item, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <motion.div
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById(item.id)
                    ?.scrollIntoView({behavior: "smooth"});
                  }}
                  key={item.label}
                  className="overlay-item"
                  initial={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.2, // staggered effect
                    ease: "easeOut",
                  }}
                >
                  {item.label}
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
