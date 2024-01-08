import styled from "styled-components";
import Content from "@/components/Content";
import InputBox from "@/components/Content/InputBox";
import { useState } from "react";
import { register } from "@/api/auth/register";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/user";

export default function Signup() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const router = useRouter();

  const handleSubmit = () => {
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    register({ id, password, school, name, email })
      .then(() => router.push("/challenge"))
      .catch((e) => {
        console.log(e);
        setUserInfo({ loaded: true });
        alert("회원가입에 실패했습니다.");
      });
  };

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Logo src="/assets/logo.svg" />
          <FormWrapper
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <InputGroup>
              <InputBox
                src="/assets/icons/badge.svg"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <InputBox
                src="/assets/icons/account_circle.svg"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <InputBox
                src="/assets/icons/email.svg"
                placeholder="이메일"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputBox
                src="/assets/icons/school.svg"
                placeholder="소속"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputBox
                src="/assets/icons/lock.svg"
                placeholder="비밀번호"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={visible}
                setVisible={setVisible}
                required
              />
              <InputBox
                src="/assets/icons/lock.svg"
                placeholder="비밀번호 확인"
                type={"password"}
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                visible={checkVisible}
                setVisible={setCheckVisible}
                required
              />
            </InputGroup>

            <InputGroup>
              <Button>회원가입</Button>
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

const SignUpWrapper = styled.div`
  display: flex;

  width: 100%;
  justify-content: flex-end;

  color: #b2a8a4;

  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
`;
