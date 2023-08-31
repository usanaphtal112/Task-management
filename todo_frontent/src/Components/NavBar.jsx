import React, { useState, useEffect } from "react";
import "./Styles/NavBar.css";

const phrases = [
  "Seamless Task Management",
  "Effortless Task Organization",
  "Streamlined Workflow",
];

const NavBar = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const typeOrDelete = async () => {
      const phrase = phrases[currentPhraseIndex];
      let currentIndex = 0;

      while (currentIndex >= 0 && currentIndex <= phrase.length) {
        setTypedText(phrase.substring(0, currentIndex));
        currentIndex = isDeleting ? currentIndex - 1 : currentIndex + 1;
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      while (currentIndex >= 0) {
        setTypedText(phrase.substring(0, currentIndex));
        currentIndex--;
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }

      setIsDeleting(false);
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    };

    typeOrDelete();
  }, [currentPhraseIndex, isDeleting, typingSpeed]);

  return (
    <nav className="navbar">
      <div className="brand">Kanban Board</div>
      <div className="animated-text">{typedText}</div>
    </nav>
  );
};

export default NavBar;
