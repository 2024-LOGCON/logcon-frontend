import styled from "styled-components";

type Props = {
  src: string;
  value: string;
  type?: HTMLInputElement["type"];
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InputBox({
  src,
  value,
  placeholder,
  type,
  required,
  onChange,
  visible,
  setVisible,
}: Props) {
  if (type === "password") {
    type = visible ? "text" : "password";
  }
  return (
    <>
      <InputWrapper>
        <Icon src={src} />
        <Input
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        {visible !== undefined && (
          <Icon
            style={{ cursor: "pointer" }}
            src={
              visible ? "/assets/icons/eye-off.svg" : "/assets/icons/eye-on.svg"
            }
            onClick={() => setVisible?.((prev) => !prev)}
          />
        )}
      </InputWrapper>
    </>
  );
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  border-radius: 2px;
  background: #3a312f;

  width: 100%;
  padding: 12px 16px;
`;

const Input = styled.input`
  border-radius: 2px;
  background: #3a312f;
  flex: 1;
  color: #b2a8a4;

  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;

  &::placeholder {
    color: #b2a8a4;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
