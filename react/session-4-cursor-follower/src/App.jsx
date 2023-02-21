import "./session-4__cursor-follower/reset.css";

import PointerFollower from "./session-4__cursor-follower/pointerFollower";

import cloudIcon from "./session-4__cursor-follower/assets/cloud-solid.svg";
import gamepadIcon from "./session-4__cursor-follower/assets/gamepad-solid.svg";
import playIcon from "./session-4__cursor-follower/assets/play-solid.svg";
import rocketIcon from "./session-4__cursor-follower/assets/rocket-solid.svg";

function App() {
  <div style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
    <div style={{ display: "flex", columnGap: "20px" }}>
      <PointerFollower icon={rocketIcon} background="green" />
      <PointerFollower icon={playIcon} background="yellow" />
    </div>
    <div style={{ display: "flex", columnGap: "20px" }}>
      <PointerFollower icon={gamepadIcon} background="red" />
      <PointerFollower icon={cloudIcon} background="blue" />
    </div>
  </div>;
}

export default App;
