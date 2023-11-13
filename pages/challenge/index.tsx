import React, { useState } from 'react';
import styled from "styled-components";
import Content from "@/components/Content";

export default function challenge() {
  const [isExpand, setIsExpand] = useState(false);

  const selectorList = ['All', 'Network', 'Server', 'Pwnable', 'Web', 'Reversing', 'Misc'];

  return (
    <Content.Container>
      <Wrapper>
        <Category>
          <p>카테고리</p>
          <Selector>
            {selectorList.map((item, index) => (
              <SelectorItem key={index}>{item}</SelectorItem>
            ))}
          </Selector>
        </Category>
        <List>
          <p>문제 목록</p>
          <Problem>
            <Header>
              <Condition>문제 다운로드 + 접속 정보 연 상태</Condition>
              <Points>500 Points</Points>
            </Header>
            <Detail>하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 
                품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 
                동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고 위하여 구하지 철환하였는가?</Detail>
            <Option>
              <ButtonContainer>
                <Download><p>문제 다운로드</p><img src="/assets/icons/download.svg"/></Download>
                <ConnectionInfo><p>접속 정보 보기</p><img src="/assets/icons/expand_less.svg"/></ConnectionInfo>
                <Flag><textarea placeholder="FLAG"/><button>제출</button></Flag>
              </ButtonContainer>
              <Connection><p>nc ctf.teamlog.kr 12345</p></Connection>
            </Option>
          </Problem>
          <Problem>
            <Header>
              <Condition>접속 정보 닫은 상태</Condition>
              <Points>500 Points</Points>
            </Header>
            <Detail>
              하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 
              품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 
              동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고
              위하여 구하지 철환하였는가?
            </Detail>
            <Option>
              <ButtonContainer>
                <ConnectionInfo><p>접속 정보 보기</p><img src="/assets/icons/expand_more.svg" /></ConnectionInfo>
                <Flag><textarea placeholder="FLAG"/><button>제출</button></Flag>
              </ButtonContainer>
            </Option>
          </Problem>
          <Problem>
            <Header>
              <Condition>입력 창만 있는 상태</Condition>
              <Points>500 Points</Points>
            </Header>
            <Detail>
              하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 
              품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 
              동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고
              위하여 구하지 철환하였는가?
            </Detail>
            <Option>
              <ButtonContainer>
                <Flag><textarea placeholder="FLAG"/><button>제출</button></Flag>
              </ButtonContainer>
            </Option>
          </Problem>
          <Problem>
            <Header>
              <Condition>이미 풀이 완료한 문제</Condition>
              <Points>500 Points</Points>
            </Header>
            <Detail>
              하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 
              품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 
              동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고
              위하여 구하지 철환하였는가?
            </Detail>
            <Option>
              <ButtonContainer>
                <ConnectionInfo><p>접속 정보 보기</p><img src="/assets/icons/expand_more.svg"/></ConnectionInfo>
                <Flag><textarea value="2시간 전에 풀이 완료"/><button><img src="/assets/icons/check.svg"/></button></Flag>
              </ButtonContainer>
            </Option>
          </Problem>
        </List>
      </Wrapper>
    </Content.Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 48px 0px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  flex: 1 0 0;
  align-self: stretch;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  
  p {
    align-self: stretch;
    color: var(--2024-logcon-70, #F5E6E1);
    font-family: Interop;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 42px */
    letter-spacing: -0.56px;
  }
`;

const Selector = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const SelectorItem = styled.button`
  display: flex;
  padding: 12px 28px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  border: 1px solid var(--2024-logcon-40, #3D3330);
  color: var(--2024-logcon-60, #D9CBC7);
  /* transition: color 0.3s ease; */
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  p {
    align-self: stretch;
    color: var(--2024-logcon-70, #F5E6E1);
    font-family: Interop;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 42px */
    letter-spacing: -0.56px;
  }
`;

const Problem = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid var(--2024-logcon-40, #3D3330);
  background: var(--2024-logcon-20, #241E1D);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Condition = styled.div`
  color: var(--2024-logcon-70, #F5E6E1);
  font-family: Interop;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const Points = styled.div`
  color: var(--2024-logcon-50, #B2A8A4);
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Detail = styled.div`
  align-self: stretch;
  color: var(--2024-logcon-60, #D9CBC7);
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const Download = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--2024-logcon-30, #3A312F);

  p {
    color: var(--2024-logcon-60, #D9CBC7);
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const ConnectionInfo = styled.button<{ $isExpand:boolean }>`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--2024-logcon-main, #E5A692);

  p {
    color: var(--2024-logcon-10, #1F1A18);
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const Flag = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;

  textarea {
    display: flex;
    padding: 12px 16px;
    height: 48px;
    align-items: center;
    flex: 1 0 0;
    border-radius: 8px 0px 0px 8px;
    background: var(--2024-logcon-30, #3A312F); 
    resize: none;
    outline: none;
    border: none;
    color: var(--2024-logcon-50, #B2A8A4);
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }

  button {
    display: flex;
    width: 68px;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 0px 8px 8px 0px;
    background: var(--2024-logcon-main, #E5A692);
    color: var(--2024-logcon-10, #1F1A18);
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
`;

const Connection = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--2024-logcon-30, #3A312F);
  
  p {
    color: var(--2024-logcon-60, #D9CBC7);
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
`;

const Check = styled.button`
  display: flex;
  width: 68px;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 0px 8px 8px 0px;
  background: var(--2024-logcon-30, #3A312F);

  img {
    width: 24px;
  height: 24px;
    flex-shrink: 0;
  }
`;