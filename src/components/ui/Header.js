import React, { useState } from "react";
import "./Header.scss";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "About Me", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Book a Lesson", href: "#" },
    { label: "Grammar Tips", href: "#" },
    { label: "Vocabulary Search", href: "#" },
  ];

  return (
    <header className="header">
      {/* Burger Button */}
      <div
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/*Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {menuItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                className="overlay-item"
                initial={{
                  x: i % 2 === 0 ? "-100%" : "100%", // alternate sides
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: i % 2 === 0 ? "-100%" : "100%",
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15, // staggered effect
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
