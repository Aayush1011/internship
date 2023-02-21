import { useRef } from "react";

import usePointerFollower from "./usePointerFollower";

import { Wrapper, Follower } from "./PointerFollower.styles";

const PointerFollower = ({ icon, background }) => {
  const wrapperRef = useRef();
  const { mousePosition } = usePointerFollower(wrapperRef);
  return (
    <Wrapper ref={wrapperRef} background={background}>
      <Follower icon={icon} left={mousePosition.x} top={mousePosition.y} />
    </Wrapper>
  );
};

export default PointerFollower;
