import React, { useState, useEffect } from "react";
import "./Header.scss";
import { motion, AnimatePresence } from "framer-motion";

const DESKTOP_BREAKPOINT = 768;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // single source of truth for menu items
  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About Me", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Book a Lesson", href: "#" },
    { label: "Grammar Tips", href: "#" },
    { label: "Vocabulary Search", href: "#" },
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
      {/* desktop left menu */}
      <nav className="menu">
        {leftItems.map((it, i) => (
          <a key={i} className="menu-btn" href={it.href}>
            {it.label}
          </a>
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
          <a key={i} className="menu-btn" href={it.href}>
            {it.label}
          </a>
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
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="overlay-item"
                  initial={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.2, // staggered effect
                    ease: "easeOut",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
