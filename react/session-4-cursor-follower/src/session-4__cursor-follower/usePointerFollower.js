import { useState, useEffect } from "react";

import cloudIcon from "./assets/cloud-solid.svg";
import gamepadIcon from "./assets/gamepad-solid.svg";
import playIcon from "./assets/play-solid.svg";
import rocketIcon from "./assets/rocket-solid.svg";

const usePointerFollower = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [icon, setIcon] = useState("");

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  const updateMousePosition = (mouseX, mouseY) => {
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const updateIcon = (iconName) => {
    setIcon(iconName);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousemove", (e) =>
      updateMousePosition(e.clientX, e.clientY)
    );
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    if (mousePosition.y < dimensions.height / 2) {
      if (mousePosition.x < dimensions.width / 2) {
        updateIcon(rocketIcon);
      } else {
        updateIcon(playIcon);
      }
    } else {
      if (mousePosition.x < dimensions.width / 2) {
        updateIcon(cloudIcon);
      } else {
        updateIcon(gamepadIcon);
      }
    }
  }, [mousePosition]);

  return { dimensions, mousePosition, icon };
};

export default usePointerFollower;
