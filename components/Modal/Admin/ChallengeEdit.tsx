import styled from "styled-components";
import Container from "../Container";
import {
  useChallenge,
  useDeleteFileInChallengeById,
  useUpdateChallenge,
} from "@/hooks";
import { useEffect, useState } from "react";
import { uploadImage } from "@/api/image";

interface Props {
  close: () => void;
  id: string;
}

export default function ChallengeEdit({ close, id }: Props) {
  const { data: challenge } = useChallenge(id);
  const { mutate: deleteFileInChallengeById } =
    useDeleteFileInChallengeById(id);
  const { mutate: updateChallenge } = useUpdateChallenge(id);

  const [name, setName] = useState(challenge?.name);
  const [description, setDescription] = useState(challenge?.description);
  const [flag, setFlag] = useState("");
  const [type, setType] = useState("NONE");
  const [connection, setConnection] = useState<string | undefined>("");
  const [file, setFile] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean | undefined>(
    challenge?.visible
  );

  useEffect(() => {
    if (!challenge) return;
    setName(challenge?.name);
    setDescription(challenge?.description);
    setType(challenge?.type);
    setConnection(
      challenge.type === "REMOTE" ? challenge.connection : challenge.imageId
    );
    setVisible(challenge?.visible);
  }, [challenge]);

  function handleUpdate() {
    if (!challenge) return;

    const connectionByType =
      challenge.type === "NONE"
        ? {}
        : challenge.type === "REMOTE"
        ? { connection }
        : { imageId: connection };

    const checkFlagNull = flag ? flag : {};

    const data = {
      name: name ? name : challenge.name,
      description: description ? description : challenge.description,
      type: type ? type : challenge.type,
      file: file ? "https://cdn.plebea.com/upload/" + file : challenge.file,
      visible: visible ? visible : challenge.visible,
      ...checkFlagNull,
      ...connectionByType,
    };
    updateChallenge(data);
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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextArea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Row>
          <Button as={"label"} htmlFor="file">
            문제 파일 업로드
          </Button>
          <Button
            id="file"
            as={"input"}
            style={{
              display: "none",
            }}
            type="file"
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
            style={{
              color: "red",
            }}
            onClick={() => deleteFileInChallengeById()}
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
        <Label>Type</Label>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="NONE">NONE</option>
          <option value="REMOTE">REMOTE</option>
          <option value="DOCKER">DOCKER</option>
        </Select>
        {type !== "NONE" && (
          <>
            <Label>{type === "REMOTE" ? "접속 정보" : "도커 이미지 ID"}</Label>
            <Input
              value={connection}
              onChange={(event) => {
                setConnection(event.target.value);
              }}
              placeholder="접속 정보를 입력해주세요."
            />
          </>
        )}
        <Row>
          <Label>공개 여부</Label>
          <CheckBox
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
          />
        </Row>
        <Button onClick={() => handleUpdate()}>수정</Button>
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

const CheckBox = styled.input`
  width: 20px;
  height: 20px;

  background-color: #3a312f;
  border: none;
`;
