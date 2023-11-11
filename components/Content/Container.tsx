import styled from "styled-components";
import Sidebar from "../Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Container(props: Props) {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Sidebar />
          <Content>{props.children}</Content>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 95%;
  max-width: 1280px;

  display: flex;
  gap: 48px;

  @media (max-width: 1280px) {
    width: 90%;
  }
`;

const Content = styled.div`
  padding: 48px 0;
  display: flex;
  flex: 1;
`;
