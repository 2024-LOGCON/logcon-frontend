import React from "react";
import styled from "styled-components";
import Content from "@/components/Content";
import { formatDateString } from "@/utils/date";
import { useNotice } from "@/hooks/notice";

export default function Notice() {
  const { data: notices } = useNotice();

  return (
    <Content.Container>
      <List>
        <p>공지사항</p>
        {notices?.map((notice, index) => (
          <NoticeItem key={index}>
            <Header>
              <Title>{notice.title}</Title>
              <Date>{formatDateString(notice?.createdAt!)}</Date>
            </Header>
            <Detail>{notice.description}</Detail>
          </NoticeItem>
        ))}
      </List>
    </Content.Container>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  width: 100%;
  padding: 48px 0;

  p {
    color: #f5e6e1;
    font-family: Interop;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 42px */
    letter-spacing: -0.56px;
  }
`;

const NoticeItem = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  border-radius: 12px;
  border: 1px solid var(--2024-logcon-30, #3a312f);
  background: #241e1d;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Title = styled.div`
  flex: 1 0 0;

  color: #f5e6e1;
  font-family: Interop;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const Date = styled.div`
  color: #b2a8a4;
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Detail = styled.div`
  align-self: stretch;

  color: #d9cbc7;
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;
