import Content from "@/components/Content";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

export default function Admin() {
  const menuList = useMemo(
    () => [
      {
        name: "Challenge",
        path: "/admin/challenge",
      },
      {
        name: "Notice",
        path: "/admin/notice",
      },
      {
        name: "User",
        path: "/admin/user",
      },
    ],
    []
  );

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Title>관리자 페이지</Title>
          <Row>
            {menuList.map((menu, index) => (
              <Button key={index} href={menu.path}>
                {menu.name}
              </Button>
            ))}
          </Row>
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  padding: 48px 0;
`;

const Title = styled.h1`
  color: #f5e6e1;
  font-family: Interop;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 42px */
  letter-spacing: -0.56px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Button = styled(Link)`
  border-radius: 2px;
  background: #3a312f;
  flex: 1;
  color: #f5e6e1;

  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;

  padding: 12px 16px;
  border-radius: 8px;
`;
