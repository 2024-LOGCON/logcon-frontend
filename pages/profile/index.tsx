import { logout } from "@/api/auth/logout";
import Content from "@/components/Content";
import { useUserInfo } from "@/hooks/user";
import { userInfoState } from "@/store/user";
import { formatDateString } from "@/utils/date";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function Profile() {
  const router = useRouter();
  const [userInfoData, setUserInfo] = useRecoilState(userInfoState);
  const { data: userInfo } = useUserInfo();

  const LogoutHandler = () => {
    logout().then(() => {
      router.push("/");
      setUserInfo({ loaded: false });
      localStorage.removeItem("accessToken");
    });
  };

  return (
    <>
      <Content.Container>
        <MainContainer>
          <ProfileContainer>
            <ProfileTitle>프로필</ProfileTitle>
            <ProfileContentWrapper>
              <ProfileLeftWrapper>
                <ProfileLogo src="/assets/icons/profile.svg" alt="profile" />
                <ProfileLeftContentWrapper>
                  <ProfileLeftTop>
                    <UserName>{userInfo?.name}</UserName>
                    <UserId>({userInfo?.id})</UserId>
                  </ProfileLeftTop>
                  <ProfileLeftBottom>
                    <UserSchool>{userInfo?.school}</UserSchool>
                    <UserPoints>총 {userInfo?.score} Points</UserPoints>
                  </ProfileLeftBottom>
                </ProfileLeftContentWrapper>
              </ProfileLeftWrapper>
              <ProfileRightWrapper>
                <ProfileRightTop>
                  <ProfileRightTitle>프로필 수정</ProfileRightTitle>
                  <ProfileRightTopLogo
                    src="/assets/icons/edit.svg"
                    alt="edit"
                  />
                </ProfileRightTop>
                <ProfileRightBottom>
                  <ProfileRightTitle onClick={LogoutHandler}>
                    로그아웃
                  </ProfileRightTitle>
                  <ProfileRightBottomLogo
                    src="/assets/icons/logout.svg"
                    alt="logout"
                  />
                </ProfileRightBottom>
              </ProfileRightWrapper>
            </ProfileContentWrapper>
          </ProfileContainer>
          <SolvedProblem>
            <SolvedTitleWrapper>
              <SolvedTitle>푼 문제</SolvedTitle>
              <SolvedCount>
                총 {userInfo?.solves?.filter((solve) => solve.correct).length}개
              </SolvedCount>
            </SolvedTitleWrapper>
            <HeaderContainer>
              <HeaderSubContainer>
                <HeaderWrapper>
                  <HeaderName>이름</HeaderName>
                  <HeaderInnerWrapper>
                    <HeaderInnerTime>풀이한 시간</HeaderInnerTime>
                    <HeaderInnerPoints>포인트</HeaderInnerPoints>
                  </HeaderInnerWrapper>
                </HeaderWrapper>
              </HeaderSubContainer>
              <TableContainer>
                {userInfo?.solves
                  ?.filter((solve) => solve.correct)
                  .map((solve) => (
                    <TableProblems key={solve.id}>
                      <TableProblemsInner>
                        <TableProblemsName>
                          {solve?.challenge?.name}
                        </TableProblemsName>
                        <TableProblemsInterface>
                          <TableProblemsTime>
                            {formatDateString(solve?.challenge?.createdAt!)}
                          </TableProblemsTime>
                          <TableProblemsPoints>
                            {solve?.challenge?.point} Points
                          </TableProblemsPoints>
                        </TableProblemsInterface>
                      </TableProblemsInner>
                    </TableProblems>
                  ))}
              </TableContainer>
            </HeaderContainer>
          </SolvedProblem>
        </MainContainer>
      </Content.Container>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 48px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;
const SolvedProblem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  gap: 24px;
`;

const ProfileTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;

  color: #f5e6e1;

  letter-spacing: -0.56px;
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 16px;
  border: 1px solid var(--2024-logcon-40, #3d3330);
  background-color: #241e1d;

  padding: 24px;

  @media (max-width: 976px) {
    flex-direction: column;

    gap: 16px;
  }
`;

const ProfileLeftWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;

  @media (max-width: 976px) {
    width: 100%;
  }
`;

const ProfileLogo = styled.img`
  width: auto;
`;

const ProfileLeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const ProfileLeftTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 4px;
`;

const ProfileLeftBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled(ProfileTitle)`
  font-size: 24px;
  letter-spacing: -0.48px;
`;
const UserId = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.36px;

  color: #f5e6e1;
`;
const UserSchool = styled(UserId)`
  font-size: 16px;
  letter-spacing: -0.32px;
`;
const UserPoints = styled(UserSchool)``;

const ProfileRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 8px;

  @media (max-width: 976px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileRightTop = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: #3a312f;

  cursor: pointer;
  gap: 8px;

  @media (max-width: 976px) {
    width: 100%;
  }
`;

const ProfileRightTitle = styled(UserSchool)``;

const ProfileRightBottom = styled(ProfileRightTop)``;

const ProfileRightTopLogo = styled.img`
  width: auto;
`;

const ProfileRightBottomLogo = styled.img`
  width: auto;
`;

const SolvedTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const SolvedTitle = styled(ProfileTitle)``;
const SolvedCount = styled(UserId)`
  font-weight: 500;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  gap: 16px;
`;
const HeaderSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 0px 24px;
  gap: 24px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const HeaderName = styled.p`
  font-size: 16px;
  font-weight: 400;

  color: var(--2024-logcon-50, #b2a8a4);

  line-height: 150%;
  letter-spacing: -0.32px;
`;

const HeaderInnerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const HeaderInnerTime = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;

  width: 128px;

  color: var(--2024-logcon-50, #b2a8a4);

  @media (max-width: 976px) {
    width: 86px;
  }
`;

const HeaderInnerPoints = styled(HeaderInnerTime)`
  width: 88px;
  @media (max-width: 976px) {
    width: 52px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 16px;
  border: 1px solid var(--2024-logcon-40, #3d3330);

  overflow: hidden;
`;

const TableProblems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 12px 24px;

  gap: 24px;

  &:nth-child(odd) {
    background: var(--2024-logcon-20, #241e1d);
  }

  &:nth-child(even) {
    background: var(--2024-logcon-10, #1f1a18);
  }
`;

const TableProblemsInner = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;

  gap: 24px;
`;

const TableProblemsName = styled(HeaderName)``;

const TableProblemsInterface = styled.div`
  display: flex;
  align-items: flex-start;
`;

const TableProblemsTime = styled(HeaderInnerTime)``;
const TableProblemsPoints = styled(HeaderInnerPoints)``;
