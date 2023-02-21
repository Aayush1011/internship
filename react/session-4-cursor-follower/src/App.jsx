import "./session-4/reset.css";

import PointerFollower from "./session-4/PointerFollower";

import cloudIcon from "./session-4/assets/cloud-solid.svg";
import gamepadIcon from "./session-4/assets/gamepad-solid.svg";
import playIcon from "./session-4/assets/play-solid.svg";
import rocketIcon from "./session-4/assets/rocket-solid.svg";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <PointerFollower icon={rocketIcon} background="green" />
        <PointerFollower icon={playIcon} background="yellow" />
      </div>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <PointerFollower icon={gamepadIcon} background="red" />
        <PointerFollower icon={cloudIcon} background="blue" />
      </div>
    </div>
  );
}

export default App;
