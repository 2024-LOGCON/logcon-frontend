import Content from "@/components/Content";
import Loading from "@/components/Loading";
import { useScoreboard } from "@/hooks/scoreboard";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Scoreboard() {
  const { data: scoreboard } = useScoreboard();

  const router = useRouter();

  return (
    <>
      <Content.Container>
        <Category
          style={{
            padding: "48px 0",
          }}
        >
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
            {scoreboard ? (
              <>
                <TableWrapper>
                  <TableContentWrapper>
                    {scoreboard?.map((item, index) => (
                      <TableContent
                        key={index}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          router.push({
                            pathname: "/profile/[id]",
                            query: { id: item.id },
                          })
                        }
                      >
                        <TableSubContentLeft>
                          <TableContentLeftItems1 $rank={index + 1}>
                            {index + 1} 위
                          </TableContentLeftItems1>
                          <TableContentLeftItems2>
                            {item.name}
                          </TableContentLeftItems2>
                        </TableSubContentLeft>
                        <TableSubContentRight>
                          <TableContentRightItems1>
                            {item.solves?.length}개
                          </TableContentRightItems1>
                          <TableContentRightItems2>
                            {item.score} Points
                          </TableContentRightItems2>
                        </TableSubContentRight>
                      </TableContent>
                    ))}
                  </TableContentWrapper>
                </TableWrapper>
              </>
            ) : (
              <Loading />
            )}
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
`;

const TableContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 12px 24px;

  &:nth-child(odd) {
    background-color: #241e1d;
  }

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
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

const TableContentLeftItems1 = styled.p<{ $rank: number }>`
  color: ${(props) =>
    (props.$rank === 1 && "#d6b26e") ||
    (props.$rank === 2 && "#B8B8B8") ||
    (props.$rank === 3 && "#CDA681") ||
    "#D9CBC7"};

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
