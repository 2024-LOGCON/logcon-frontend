import Content from "@/components/Content";
import Modal from "@/components/Modal";
import { useChallenges } from "@/hooks";
import { useState } from "react";
import styled from "styled-components";

export default function AdminChallenge() {
  const { data: challenges } = useChallenges();
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <>
      <Content.Container>
        <Wrapper>
          <TitleRow>
            <Title>Challenge 관리자</Title>
            <SubmitButton onClick={() => setCreateModal(true)}>
              문제 추가
            </SubmitButton>
          </TitleRow>
          <Row>
            {challenges?.map((challenge) => (
              <Button
                onClick={() => {
                  setSelected(challenge.id);
                  setEditModal(true);
                }}
                key={challenge.id}
              >
                {challenge.name}
              </Button>
            ))}
          </Row>
        </Wrapper>
      </Content.Container>
      {createModal && (
        <Modal.Admin.Challenge close={() => setCreateModal(false)} />
      )}
      {editModal && (
        <Modal.Admin.ChallengeEdit
          close={() => setEditModal(false)}
          id={selected}
        />
      )}
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #3a312f;
  border: none;
  border-radius: 8px;
  padding: 12px 14px;

  font-size: 16px;
  color: white;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 40px;

  background: #241e1d;
  border-radius: 12px;
  border: 1px solid var(--2024-logcon-30, #3a312f);

  color: #f5e6e1;
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;
