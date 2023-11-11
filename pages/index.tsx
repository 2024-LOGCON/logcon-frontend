import Content from "@/components/Content";
import styled from "styled-components";

export default function Index() {
  return (
    <>
      <Content.Container>
        <Wrapper></Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
