import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styled from "styled-components";
import Content from "@/components/Content";

const categories = [
  {name: 'All', path: 'all'}, 
  {name: 'Network', path: 'network'}, 
  {name:'Server' , path: 'server'}, 
  {name:'Pwnable', path: 'pwnable'}, 
  {name:'Web', path: 'web'}, 
  {name:'Reversing', path: 'reversing'}, 
  {name:'Misc', path: 'misc'}, 
];

export default function challenge() {
  const [isExpand, setIsExpand] = useState(false);
  const [isDownload, setIsDownload] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const expand_less = '/assets/icons/expand_less.svg';
  const expand_more = '/assets/icons/expand_more.svg';
  const check = '/assets/icons/check.svg';

  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, []);

  const handleCategories = (name) => {
    if(selectedCategory === null || selectedCategory !== name) {
      setSelectedCategory(name);
      localStorage.setItem('selectedCategory', name);
    }
  }

  return (
    <Content.Container>
      <Wrapper>
        <Category>
          <p>카테고리</p>
          <Selector>
            {categories.map(({name, path}, index) => (
              <Link key={index} href={{ pathname: '/challenge', query: { category: path }}}>
                <SelectorItem 
                  $isSelected = {name === selectedCategory}
                  onClick={()=>handleCategories(name)}>
                  {name}
                </SelectorItem>
              </Link>
            ))}
          </Selector>
        </Category>
        <List>
          <p>문제 목록</p>
          <Problem>
            <Header>
              <Condition>문제의 상태를 표시하는 곳</Condition>
              <Points>500 Points</Points>
            </Header>
            <Detail>하는 무엇을 사는가 청춘의 소담스러운 착목한는 있는 끝에 만물은 그리하였는가? 공자는 청춘의 되는 따뜻한 전인 같은 있다. 품었기 반짝이는 천고에 밝은 부패를 노년에게서 사막이다. 내려온 그들에게 앞이 무한한 있으랴? 설산에서 없으면, 동력은 천고에 있을 긴지라 굳세게 열매를 생명을 황금시대다. 그러므로 이성은 구하지 희망의 원질이 그것을 작고 위하여 구하지 철환하였는가?</Detail>
            <Option>
              <ButtonContainer>
                {isDownload === true &&
                <Download><p>문제 다운로드</p><img src="/assets/icons/download.svg"/></Download>}
                {isConnected === true &&
                <ConnectionInfo
                  $isExpand = {isExpand}
                  onClick={() => setIsExpand(prevState => !prevState)}
                ><p>접속 정보 보기</p>{isExpand ? <img src={expand_less}/> : <img src={expand_more}/>}</ConnectionInfo>}
                <Flag>
                {isSolved ? <textarea value="2시간 전에 풀이 완료" disabled/> : <textarea placeholder="FLAG"/>}
                {isSolved ? <Check><img src={check} /></Check> : <Submit onClick={()=>setIsSolved(prevState => !prevState)}>제출</Submit>}
                </Flag>
              </ButtonContainer>
              {isExpand === true && <Connection><p>nc ctf.teamlog.kr 12345</p></Connection>}
            </Option>
          </Problem>
        </List>
      </Wrapper>
    </Content.Container>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 48px 0px;
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

const SelectorItem = styled.button<{ $isSelected: boolean }>`
  display: flex;
  padding: 12px 28px;
  justify-content: center;
  align-items: center;

  border-radius: 32px;
  border: 1px solid var(--2024-logcon-40, #3D3330);
  color: ${({ $isSelected }) => ($isSelected ? "var(--2024-logcon-10, #1F1A18)" : "var(--2024-logcon-60, #D9CBC7)")};
  background: ${({ $isSelected }) => ($isSelected ? "var(--2024-logcon-main, #E5A692)" : "var(--2024-logcon-40, #3D3330)")};
  transition: color 0.2s, background 0.2s;
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
  background: ${({ $isExpand }) => ($isExpand ? "var(--2024-logcon-main, #E5A692)" : "var(--2024-logcon-30, #3A312F)")};
  transition: background 0.2s, color 0.2s;

  p {
    color: ${({ $isExpand }) => ($isExpand ? "var(--2024-logcon-10, #1F1A18)" : "var(--2024-logcon-60, #D9CBC7)")};
    transition: background 0.2s, color 0.2s;
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

const Flag = styled.div<{ $isSolved:boolean }>`
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
    color: ${({ $isSolved }) => ($isSolved ? "var(--2024-logcon-main, #E5A692)" : "var(--2024-logcon-50, #B2A8A4)")};
    font-family: Interop;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
  }
`;

const Submit = styled.button`
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