import styled from "styled-components";

export const Wrapper = styled.div`
  width: ${({ divWidth }) => `${divWidth}px`};
  height: ${({ divHeight }) => `${divHeight}px`};

  ::before {
    content: "";
    position: absolute;
    width: 2px;
    height: ${({ divHeight }) => `${divHeight}px`};
    top: 0;
    left: ${({ divWidth }) => `${divWidth / 2}px`};
    background: black;
    border: 2px solid black;
  }

  ::after {
    content: "";
    position: absolute;
    width: ${({ divWidth }) => `${divWidth}px`};
    height: 2px;
    top: ${({ divHeight }) => `${divHeight / 2}px`};
    left: 0;
    background: black;
    border: 2px solid black;
  }
`;

export const Follower = styled.picture`
  background-image: url(${({ icon }) => icon});
  width: 50px;
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;
