import { useState, useEffect } from "react";

const usePointerFollower = (box) => {
  console.log(box.current);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (mouseX, mouseY) => {
    setMousePosition({ x: mouseX, y: mouseY });
  };

  useEffect(() => {
    box.current.addEventListener("mousemove", (e) =>
      updateMousePosition(e.clientX, e.clientY)
    );
    return () => {
      box.current.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return { mousePosition };
};

export default usePointerFollower;
