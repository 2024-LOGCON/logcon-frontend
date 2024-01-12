import Content from "@/components/Content";
import Link from "next/link";
import styled from "styled-components";

export default function Index() {
  return (
    <>
      <Content.Container>
        <Wrapper>
          <BoxWrapper>
            <Column $gap={32}>
              <Column $gap={12}>
                <Title>7th</Title>
                <Logo src="/assets/logo.svg" />
              </Column>
              <SubTitle>2024. 1. 13. 9:00 ~ 2024. 1. 14. 9:00</SubTitle>
              <Button href="https://discord.gg/dKCx9vef">
                디스코드 서버 참가
                <ButtonImage src="/assets/icons/right_arrow.svg" />
              </Button>
            </Column>
            <Column $gap={17}>
              <Title>시상 내역</Title>
              <ContentRow>
                <RankText $color="#D6B26E">1위</RankText>
                <RankText $color="#C7CCD9">삼성 버즈2 PRO</RankText>
              </ContentRow>
              <ContentRow>
                <RankText $color="#B8B8B8">2위</RankText>
                <RankText $color="#C7CCD9">
                  로지텍 G502 X 유선 게이밍 마우스
                </RankText>
              </ContentRow>
              <ContentRow>
                <RankText $color="#CDA681">3위</RankText>
                <RankText $color="#C7CCD9">COX CK87 게이트론 크림블루</RankText>
              </ContentRow>
              <ContentRow>
                <RankText $color="#C7CCD9">특별상</RankText>
                <RankText $color="#C7CCD9">로지텍 G304 3명</RankText>
              </ContentRow>
            </Column>
          </BoxWrapper>
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxWrapper = styled.div`
  width: 90%;
  max-width: 640px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #241e1d;
  border-radius: 16px;
  border: 1px solid var(--2024-logcon-40, #3d3330);

  padding: 64px 0;
  margin: 48px 0;
  gap: 64px;
`;

const Column = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: ${(props) => props.$gap}px;
`;

const Title = styled.h1`
  color: var(--2023-Logcon-80, #fff);
  font-family: Interop;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 42px */
  letter-spacing: -0.56px;
`;

const Logo = styled.img`
  width: 190px;
`;

const SubTitle = styled.h2`
  font-family: Interop;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  color: #f5e6e1;
`;

const Button = styled(Link)`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--2024-Logcon-40, #3d3330);
  color: var(--2024-Logcon-80, #d9cbc7);
`;

const ButtonImage = styled.img`
  width: 16px;
  height: 16px;
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RankText = styled.p<{ $color: string }>`
  color: ${(props) => props.$color};
  font-family: Interop;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
`;
