import { styled } from "styled-components";
import Container from "../Container";
import { useState } from "react";
import { useUploadNotice } from "@/hooks/notice";

interface Props {
  close: () => void;
}

export function Notice({ close }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createNotice } = useUploadNotice();

  const submit = () => {
    createNotice({ title, description });
    close();
  };

  return (
    <Container close={close}>
      <Wrapper>
        <Label>제목</Label>
        <Input
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>내용</Label>
        <Input
          placeholder="내용을 입력해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={submit}>생성</Button>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  padding: 4px 8px;
`;

const Label = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #f5e6e1;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;

  background: #3a312f;
  border-radius: 8px;
  border: none;

  padding: 0 12px;

  font-size: 16px;
  font-weight: 400;
  color: #f5e6e1;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;

  background: #3a312f;
  border-radius: 8px;
  border: none;

  padding: 0 12px;

  font-size: 16px;
  font-weight: 400;
  color: #f5e6e1;
`;
