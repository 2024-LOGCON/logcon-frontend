import styled from "styled-components";
import Content from "@/components/Content";
import InputBox from "@/components/Content/InputBox";
import { useState } from "react";
import Link from "next/link";

export default function Signin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Logo src="/assets/logo.svg" />
          <FormWrapper
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputGroup>
              <InputBox
                src="/assets/icons/account_circle.svg"
                placeholder="아이디 혹은 이메일"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <InputBox
                src="/assets/icons/lock.svg"
                placeholder="비밀번호"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={visible}
                setVisible={setVisible}
              />
            </InputGroup>

            <InputGroup>
              <Button
                style={{
                  borderRadius: 8,
                }}
              >
                로그인
              </Button>
              <SignInWrapper>
                <Link href="/signup">회원가입</Link>
              </SignInWrapper>
            </InputGroup>
          </FormWrapper>
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: 100%;
`;

const Logo = styled.img`
  height: 82px;
`;

const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-radius: 8px;
  overflow: hidden;
`;

const Button = styled.button`
  border-radius: 2px;
  background: #3a312f;
  flex: 1;
  color: #f5e6e1;

  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;

  width: 100%;
  padding: 12px 16px;
`;

const SignInWrapper = styled.div`
  display: flex;

  width: 100%;
  justify-content: flex-end;

  color: #b2a8a4;

  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
`;
