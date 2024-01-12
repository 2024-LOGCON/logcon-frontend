import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  close: () => void;
};

export default function Container({ children, close }: Props) {
  return (
    <>
      <Background onClick={close} />
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100dvh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  border-radius: 18px;
  background-color: #241e1d;
  padding: 12px;

  width: 90%;
  max-width: 500px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
