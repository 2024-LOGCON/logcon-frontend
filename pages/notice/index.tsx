import React, { useState } from 'react';
import styled from "styled-components";
import Content from "@/components/Content";

const notices = [
  { title: '오늘부터 팀로그가 정보보호과 동아리 전체를 흡수합니다',
    date: '2020.01.02 12:41',
    detail: '하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고 위하여 구하지 철환하였는가?'
  },
  { title: '오늘부터 팀로그가 정보보호과 동아리 전체를 흡수합니다!',
    date: '2021.03.04 9:17',
    detail: '하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고 위하여 구하지 철환하였는가?'
  },
  { title: '오늘부터 팀로그가 정보보호과 동아리 전체를 흡수합니다?',
    date: '2022.05.08 3:55',
    detail: '하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고 위하여 구하지 철환하였는가?'
  },
];

export default function notice() {
  return (
    <Content.Container>
      <List>
        <p>공지사항</p>
        {notices.map((notice, index) => (
          <Notice key={index}>
            <Header>
              <Title>{notice.title}</Title>
              <Date>{notice.date}</Date>
            </Header>
            <Detail>{notice.detail}</Detail>
          </Notice>
        ))}
      </List>
    </Content.Container>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  p {
    color: #F5E6E1;
    font-family: Interop;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 42px */
    letter-spacing: -0.56px;
  }
`;

const Notice = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  border-radius: 12px;
  border: 1px solid var(--2024-logcon-30, #3A312F);
  background: #241E1D;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Title = styled.div`
  flex: 1 0 0;

  color: #F5E6E1;
  font-family: Interop;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const Date = styled.div`
  color: #B2A8A4;
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Detail = styled.div`
  align-self: stretch;

  color: #D9CBC7;
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;