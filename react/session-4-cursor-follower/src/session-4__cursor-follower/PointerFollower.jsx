import usePointerFollower from "./usePointerFollower";

import { Wrapper, Follower } from "./PointerFollower.styles";

const PointerFollower = () => {
  const { dimensions, mousePosition, icon } = usePointerFollower();
  return (
    <Wrapper divWidth={dimensions.width} divHeight={dimensions.height}>
      <Follower icon={icon} left={mousePosition.x} top={mousePosition.y} />
    </Wrapper>
  );
};

export default PointerFollower;
