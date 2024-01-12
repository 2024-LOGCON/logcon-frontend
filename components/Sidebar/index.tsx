import { publicRoute } from "@/constants/auth";
import { useAdmin, useUserInfo } from "@/hooks/user";
import { userInfoState } from "@/store/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [userInfoData, setUserInfo] = useRecoilState(userInfoState);
  const { data: userInfo } = useUserInfo();

  const { data: isAdmin } = useAdmin();

  const menuList = useMemo(
    () => [
      {
        name: "Challenge",
        path: "/challenge",
        visible: true,
      },
      {
        name: "Scoreboard",
        path: "/scoreboard",
        visible: true,
      },
      {
        name: "Notice",
        path: "/notice",
        visible: true,
      },
      {
        name: "Admin",
        path: "/admin",
        visible: isAdmin?.status,
      },
    ],
    [isAdmin?.status]
  );

  console.log(isAdmin?.status);

  return (
    <>
      <Background $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <Wrapper $isOpen={isOpen}>
        <HamburgerButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <HamburgerIcon src="/assets/icons/menu.svg" alt="Menu" />
        </HamburgerButton>
        <TitleWrapper>
          <Link href={"/"}>
            <Logo src="/assets/logo.svg" alt="LOGCON" />
          </Link>
          <ProfileWrapper href={userInfo?.name ? "/profile" : "/signin"}>
            <ProfileImage
              src="/assets/icons/dummy_profile.svg"
              alt="Profile Image"
            />
            <p>
              {userInfoData?.loaded
                ? userInfo?.name ?? "로그인해주세요"
                : "로딩중...."}
            </p>
          </ProfileWrapper>
          <MenuWrapper>
            {menuList.map(
              (menu, index) =>
                menu.visible && (
                  <MenuItem
                    $isSelected={
                      menu.name === "Admin"
                        ? router.pathname.includes(menu.path)
                        : router.pathname === menu.path
                    }
                    key={index}
                    href={userInfo?.name ? menu.path : "/signin"}
                  >
                    {menu.name}
                  </MenuItem>
                )
            )}
          </MenuWrapper>
        </TitleWrapper>
        <InformationWrapper>
          <p>&copy; 2024 TeamLog</p>
          <LinkWrapper>
            <Link href={"https://teamlog.kr"}>Website</Link>
            <hr />
            <Link href={"https://facebook.com/sunrintog"}>Facebook</Link>
          </LinkWrapper>
        </InformationWrapper>
      </Wrapper>
    </>
  );
}

const Background = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};

  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const Wrapper = styled.div<{ $isOpen: boolean }>`
  width: 256px;
  height: calc(100dvh - 96px);
  border-radius: 16px;
  position: relative;
  padding: 44px 36px;

  position: sticky;
  top: 48px;
  bottom: 48px;

  border: 1px solid #4d403c;
  background-color: #241e1d;

  margin: 48px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1280px) {
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;

    left: ${({ $isOpen }) => ($isOpen ? "0" : "-256px")};
    transition: left 0.3s ease-in-out;

    height: 100dvh;
    border-radius: 0;
    border: 0;
    border-right: 1px solid #4d403c;
  }
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1280px) {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 18px;
    right: ${({ $isOpen }) => ($isOpen ? "18px" : "-40px")};
  }
`;

const HamburgerIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;

const Logo = styled.img`
  height: 40px;
`;

const ProfileWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    color: #f5e6e1;
    font-size: 18px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.36px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuItem = styled(Link)<{ $isSelected?: boolean }>`
  color: ${({ $isSelected }) => ($isSelected ? "#E5A692" : "#B2A8A4")};
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.36px;
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: #b2a8a4;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.32px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a {
    color: #d6a89b;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.32px;
  }

  hr {
    width: 1px;
    height: 12px;
    background-color: #4d403c;
  }
`;
