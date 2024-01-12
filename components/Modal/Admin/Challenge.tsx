import styled from "styled-components";
import Container from "../Container";
import {
  useChallenge,
  useCreateChallenge,
  useDeleteFileInChallengeById,
  useUpdateChallenge,
} from "@/hooks";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/category";
import { CreateProps } from "@/api/Challenge/create";
import { ChallengeType } from "@/api/Challenge/get";
import { uploadImage } from "@/api/image";

interface Props {
  close: () => void;
}

export default function Challenge({ close }: Props) {
  const { data: categories } = useCategory();
  const { mutate: createChallenge } = useCreateChallenge();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState("");
  const [type, setType] = useState<ChallengeType>(ChallengeType.NONE);
  const [file, setFile] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>("");
  const [connection, setConnection] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCategory(categories?.[0].id);
  }, [categories]);

  function handleSubmit() {
    if (!category) return;

    const connectionByType =
      type === ChallengeType.NONE
        ? {}
        : type === ChallengeType.REMOTE
        ? { connection: connection }
        : { imageId: connection };

    const data: CreateProps = {
      name,
      description,
      flag,
      type,
      ...{ connectionByType },
      categoryId: category,
    };
    createChallenge(data);
    close();
  }

  function fileUpload(file: FormData) {
    uploadImage(file).then((res) => {
      setFile(res.location?.split("/")[1]);
    });
  }

  return (
    <Container close={close}>
      <Wrapper>
        <TitleInput
          placeholder="문제 이름을 입력해주세요."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextArea
          placeholder="문제 설명을 입력해주세요."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Row>
          <Button as={"label"} htmlFor="file">
            문제 파일 업로드
          </Button>
          <Button
            id="file"
            style={{
              display: "none",
            }}
            as={"input"}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
              fileUpload(formData);
            }}
          />
          <Button
            onClick={() => {
              setFile(undefined);
            }}
            style={{
              color: "red",
            }}
          >
            문제 파일 제거
          </Button>
        </Row>
        <Label>Flag</Label>
        <Input
          placeholder="보안을 위해 확인은 불가하고 수정만 가능합니다."
          value={flag}
          onChange={(event) => setFlag(event.target.value)}
        />
        <Label>Category</Label>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </Select>
        <Label>Type</Label>
        <Select
          value={type}
          onChange={(event) => setType(event.target.value as ChallengeType)}
        >
          <option value={ChallengeType.NONE}>NONE</option>
          <option value={ChallengeType.REMOTE}>REMOTE</option>
          <option value={ChallengeType.DOCKER}>DOCKER</option>
        </Select>
        {type !== "NONE" && (
          <>
            <Label>{type === "REMOTE" ? "접속 정보" : "도커 이미지 ID"}</Label>
            <Input
              value={connection}
              onChange={(event) => setConnection(event.target.value)}
              placeholder="접속 정보를 입력해주세요."
            />
          </>
        )}
        <Button onClick={() => handleSubmit()}>생성</Button>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  padding: 4px 8px;
`;

const TitleInput = styled.input`
  width: 100%;

  background-color: transparent;
  border: none;
  border-bottom: 1px solid #f5e6e1;

  padding: 8px 4px;

  font-size: 24px;
  font-weight: 500;
  color: white;
`;

const Input = styled.input`
  width: 100%;

  background-color: #3a312f;
  border: none;
  border-radius: 8px;
  padding: 10px 12px;

  font-size: 16px;
  color: white;
`;

const TextArea = styled.textarea`
  width: 100%;

  background-color: #3a312f;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 18px;
  font-weight: 500;
  color: white;
  resize: none;
  height: 200px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  background-color: #3a312f;
  border-radius: 8px;
  padding: 8px;

  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const Label = styled.h3`
  color: #f5e6e1;
  font-family: Interop;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  width: 100%;

  background-color: #3a312f;
  border: none;
  border-radius: 8px;
  padding: 12px;

  font-size: 16px;
  color: white;
`;
