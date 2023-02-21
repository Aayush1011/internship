import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  height: 50vh;
  background: ${({ background }) => background};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
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
