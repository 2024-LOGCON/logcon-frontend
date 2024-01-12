import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <>
      <LoadingWrap>
        <LoadingSubWrap>
          <LoadingItem />
        </LoadingSubWrap>
      </LoadingWrap>
    </>
  );
};

const animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingWrap = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSubWrap = styled.div`
  width: 60px;
  height: 60px;

  &::after {
    content: " ";
    display: block;
    width: 56px;
    height: 56px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ffffff;
    border-color: #ffffff transparent #ffffff transparent;
    animation: ${animation} 0.8s linear infinite;
  }
`;

const LoadingItem = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
