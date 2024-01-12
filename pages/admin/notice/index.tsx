import Content from "@/components/Content";
import Modal from "@/components/Modal";
import { useNotice } from "@/hooks/notice";
import { useState } from "react";
import styled from "styled-components";

export default function AdminNotice() {
  const { data: notices } = useNotice();
  const [modal, setModal] = useState(false);

  return (
    <>
      <Content.Container>
        <Wrapper>
          <TitleRow>
            <Title>Notice 관리자</Title>
            <Button onClick={() => setModal(true)}>공지 추가</Button>
          </TitleRow>
          <Row>
            {notices?.map((notice) => (
              <ContentBox key={notice.id}>
                <ContentTitle>{notice.title}</ContentTitle>
                <ContentDetail>{notice.description}</ContentDetail>
              </ContentBox>
            ))}
          </Row>
        </Wrapper>
      </Content.Container>
      {modal && <Modal.Admin.Notice close={() => setModal(false)} />}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 24px;
  padding: 48px 0;
  width: 100%;
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

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  color: #f5e6e1;
  font-family: Interop;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  background-color: #3a312f;
  border-radius: 12px;
  border: none;
  padding: 12px 18px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  width: 180px;
  padding: 12px 18px;
  background-color: #241e1d;
  border-radius: 12px;
  border: 1px solid var(--2024-logcon-30, #3a312f);
  cursor: pointer;
`;

const ContentTitle = styled.h3`
  color: #f5e6e1;
  font-family: Interop;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
`;

const ContentDetail = styled.p`
  color: #f5e6e1;
  font-family: Interop;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;
