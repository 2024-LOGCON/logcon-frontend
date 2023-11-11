import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styled from "styled-components";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuList = useMemo(
    () => [
      {
        name: "Challenge",
        path: "/challenge",
      },
      {
        name: "Scoreboard",
        path: "/scoreboard",
      },
      {
        name: "Notice",
        path: "/notice",
      },
    ],
    []
  );

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
          <ProfileWrapper>
            <ProfileImage
              src="/assets/icons/dummy_profile.svg"
              alt="Profile Image"
            />
            <p>김성빈</p>
          </ProfileWrapper>
          <MenuWrapper>
            {menuList.map((menu, index) => (
              <MenuItem
                $isSelected={router.pathname.includes(menu.path)}
                key={index}
                href={menu.path}
              >
                {menu.name}
              </MenuItem>
            ))}
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
  height: 994px;
  border-radius: 16px;
  position: relative;
  padding: 44px 36px;

  position: sticky;
  top: 48px;

  border: 1px solid #4d403c;
  background-color: #241e1d;

  margin-top: 48px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1280px) {
    margin-top: 0;
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

const ProfileWrapper = styled.div`
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
  color: ${({ $isSelected }) => ($isSelected ? "#F5E6E1" : "#B2A8A4")};
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
