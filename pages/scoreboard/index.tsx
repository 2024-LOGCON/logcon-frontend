import Content from "@/components/Content";
import styled from "styled-components";

export default function Scoreboard() {
  return (
    <>
      <Content.Container>
        <Category>
          <MainTitle>스코어보드</MainTitle>
          <MainWrapper>
            <ProblemWrapper>
              <HeaderWrapper>
                <HeaderContentLeft>
                  <HeaderContentLeftItmes1>순위</HeaderContentLeftItmes1>
                  <HeaderContentLeftItems2>이름</HeaderContentLeftItems2>
                </HeaderContentLeft>
                <HeaderContentRight>
                  <HeaderContentRightItems1>푼 문제</HeaderContentRightItems1>
                  <HeaderContentRightItems2>포인트</HeaderContentRightItems2>
                </HeaderContentRight>
              </HeaderWrapper>
            </ProblemWrapper>
            <TableWrapper>
              <TableContentWrapper>
                <TableContent>
                  <TableSubContentLeft>
                    <TableContentLeftItems1>1 위</TableContentLeftItems1>
                    <TableContentLeftItems2>김성빈</TableContentLeftItems2>
                  </TableSubContentLeft>
                  <TableSubContentRight>
                    <TableContentRightItems1>14개</TableContentRightItems1>
                    <TableContentRightItems2>
                      1400 Points
                    </TableContentRightItems2>
                  </TableSubContentRight>
                </TableContent>
              </TableContentWrapper>
            </TableWrapper>
          </MainWrapper>
        </Category>
      </Content.Container>
    </>
  );
}

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  gap: 24px;
  width: 100%;
  max-width: 976px;
`;

const MainTitle = styled.h1`
  color: var(--2024-logcon-70, #f5e6e1);
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.56px;
`;

const MainWrapper = styled(Category)`
  gap: 16px;

  width: 100%;
  max-width: 1020px;
`;

const ProblemWrapper = styled(Category)`
  padding: 0px 24px;

  @media (max-width: 920px) {
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 100%;
  max-width: 926px;
`;

const HeaderContentLeft = styled.div`
  display: flex;
  align-items: flex-start;
`;

const HeaderContentRight = styled(HeaderContentLeft)`
  width: 100%;
  max-width: 168px;
`;

const HeaderContentLeftItmes1 = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;

  color: var(--2024-logcon-50, #b2a8a4);

  width: 56px;
`;

const HeaderContentLeftItems2 = styled(HeaderContentLeftItmes1)`
  width: 100%;
  max-width: 28px;
`;

const HeaderContentRightItems1 = styled(HeaderContentLeftItmes1)`
  width: 100%;
  max-width: 72px;
`;
const HeaderContentRightItems2 = styled(HeaderContentRightItems1)`
  max-width: 96px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 16px;
  border: 1px solid var(--2024-logcon-40, #3d3330);

  width: 100%;
  @media (max-width: 920px) {
  }
`;
const TableContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 12px 24px;

  gap: 24px;
`;

const TableContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const TableSubContentLeft = styled.div`
  display: flex;
  align-items: flex-start;

  width: 90%;
  @media (max-width: 387px) {
    width: 70%;
  }
`;
const TableSubContentRight = styled(TableSubContentLeft)`
  width: 100%;
  max-width: 168px;
`;

const TableContentLeftItems1 = styled.p`
  color: #d6b26e;

  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;

  width: 100%;
  max-width: 56px;
`;

const TableContentLeftItems2 = styled.p`
  color: var(--2024-logcon-60, #d9cbc7);
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
`;

const TableContentRightItems1 = styled(TableContentLeftItems2)`
  width: 100%;
  max-width: 72px;
`;
const TableContentRightItems2 = styled(TableContentRightItems1)`
  max-width: 96px;
`;
