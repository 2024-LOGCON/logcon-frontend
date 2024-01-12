/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Content from "@/components/Content";
import { Challenge as ChallengeType } from "@/api/Challenge/get";
import { Category as CategoryType } from "@/api/Category/get";
import { useRouter } from "next/router";
import CategoryAPI from "@/api/Category";
import { useChallenges, useSolveChallenge } from "@/hooks";
import { useUserInfo } from "@/hooks/user";
import Loading from "@/components/Loading";
import Docker from "@/api/Docker";

export default function Challenge() {
  const [isExpandList, setIsExpandList] = useState<{
    [key: string]: boolean;
  }>({});
  const [flags, setFlags] = useState<{
    [key: string]: string;
  }>({});
  // const [challenges, setChallenges] = useState<ChallengeType[]>();
  const { data: userInfo } = useUserInfo();
  const { data: challenges } = useChallenges();
  const { mutateAsync: solveChallenge } = useSolveChallenge();
  const [categories, setCategories] = useState<CategoryType[]>();
  const [dockers, setDockers] = useState<{
    [key: string]: string;
  }>();

  const router = useRouter();

  const expand_less = "/assets/icons/expand_less.svg";
  const expand_more = "/assets/icons/expand_more.svg";
  const check = "/assets/icons/check.svg";

  const handleSubmit = (id: string) => {
    solveChallenge([id, flags[id]]).then(
      (res) => !res.data?.correct && alert("오답입니다.")
    );
  };

  useEffect(() => {
    setIsExpandList(
      challenges?.reduce((acc, cur) => ({ ...acc, [cur.id]: false }), {}) ?? {}
    );
    setFlags(
      challenges?.reduce((acc, cur) => ({ ...acc, [cur.id]: "" }), {}) ?? {}
    );
    setDockers(
      challenges?.reduce((acc, cur) => {
        if (cur.type === "DOCKER") {
          return { ...acc, [cur.id]: "로딩 중..." };
        } else {
          return acc;
        }
      }, {}) ?? {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenges]);

  useEffect(() => {
    CategoryAPI.get().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <Content.Container>
      <Wrapper>
        {categories && challenges && userInfo ? (
          <>
            <Category>
              <p>카테고리</p>
              <Selector>
                <Link
                  href={{
                    pathname: "/challenge",
                    query: { category: "All" },
                  }}
                >
                  <SelectorItem
                    $isSelected={"All" === (router.query?.category ?? "All")}
                  >
                    All
                  </SelectorItem>
                </Link>
                {categories?.map((category, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: "/challenge",
                      query: { category: category.name },
                    }}
                  >
                    <SelectorItem
                      $isSelected={
                        category.name === (router.query?.category ?? "All")
                      }
                    >
                      {category.name}
                    </SelectorItem>
                  </Link>
                ))}
              </Selector>
            </Category>
            <List>
              <p>문제 목록</p>
              {challenges
                ?.filter(
                  (challenge) =>
                    challenge.category?.name === router.query?.category ||
                    (router.query?.category ?? "All") === "All"
                )
                .map((challenge) => (
                  <Problem key={challenge.id}>
                    <Header>
                      <Condition>{challenge.name}</Condition>
                      <Points>{challenge.point} Points</Points>
                    </Header>
                    <Detail>{challenge.description}</Detail>
                    <Option>
                      <ButtonContainer>
                        {challenge?.file && (
                          <Download href={challenge?.file} target="_blank">
                            <p>문제 다운로드</p>
                            <img
                              src="/assets/icons/download.svg"
                              alt="문제 파일 다운로드"
                            />
                          </Download>
                        )}
                        {challenge?.type !== "NONE" &&
                          (challenge?.type === "REMOTE" ? (
                            <ConnectionInfo
                              $isExpand={isExpandList[challenge.id]}
                              onClick={() =>
                                setIsExpandList((prevState) => ({
                                  ...prevState,
                                  [challenge.id]: !prevState[challenge.id],
                                }))
                              }
                            >
                              <p>접속 정보 보기</p>
                              <img
                                src={
                                  isExpandList[challenge.id]
                                    ? expand_less
                                    : expand_more
                                }
                                alt="화살표"
                              />
                            </ConnectionInfo>
                          ) : (
                            <ConnectionInfo
                              $isExpand={isExpandList[challenge.id]}
                              onClick={() => {
                                if (
                                  !isExpandList[challenge.id] &&
                                  dockers?.[challenge.id] === "로딩 중..."
                                ) {
                                  Docker.start(challenge.id).then((res) => {
                                    setDockers((prevState) => ({
                                      ...prevState,
                                      [challenge.id]: `HOST: ${res?.host} | PORT: ${res?.port}`,
                                    }));
                                  });
                                }

                                setIsExpandList((prevState) => ({
                                  ...prevState,
                                  [challenge.id]: !prevState[challenge.id],
                                }));
                              }}
                            >
                              <p>접속 정보 보기</p>
                              <img
                                src={
                                  isExpandList[challenge.id]
                                    ? expand_less
                                    : expand_more
                                }
                                alt="화살표"
                              />
                            </ConnectionInfo>
                          ))}
                        <Flag $isSolved={false}>
                          {userInfo?.solves?.find(
                            (solve) =>
                              solve.correct &&
                              solve.challenge?.id === challenge.id
                          ) ? (
                            <>
                              <textarea value="2시간 전에 풀이 완료" disabled />
                              <Check>
                                <img src={check} alt="체크" />
                              </Check>
                            </>
                          ) : (
                            <>
                              <input
                                value={flags[challenge?.id] ?? ""}
                                onChange={(e) =>
                                  setFlags((prevState) => ({
                                    ...prevState,
                                    [challenge.id]: e.target.value,
                                  }))
                                }
                                placeholder="LOGCON{...}"
                              />
                              <Submit
                                onClick={() => handleSubmit(challenge?.id)}
                              >
                                제출
                              </Submit>
                            </>
                          )}
                        </Flag>
                      </ButtonContainer>
                      {isExpandList[challenge.id] === true && (
                        <Connection>
                          <p>
                            {challenge?.type === "REMOTE"
                              ? challenge.connection
                              : dockers?.[challenge.id]}
                          </p>
                        </Connection>
                      )}
                    </Option>
                  </Problem>
                ))}
            </List>
          </>
        ) : (
          <Loading />
        )}
      </Wrapper>
    </Content.Container>
  );
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

    color: var(--2024-logcon-70, #f5e6e1);
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
  border: 1px solid var(--2024-logcon-40, #3d3330);
  color: ${({ $isSelected }) =>
    $isSelected
      ? "var(--2024-logcon-10, #1F1A18)"
      : "var(--2024-logcon-60, #D9CBC7)"};
  background: ${({ $isSelected }) =>
    $isSelected
      ? "var(--2024-logcon-main, #E5A692)"
      : "var(--2024-logcon-40, #3D3330)"};
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

    color: var(--2024-logcon-70, #f5e6e1);
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
  border: 1px solid var(--2024-logcon-40, #3d3330);
  background: var(--2024-logcon-20, #241e1d);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Condition = styled.div`
  color: var(--2024-logcon-70, #f5e6e1);
  font-family: Interop;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
`;

const Points = styled.div`
  color: var(--2024-logcon-50, #b2a8a4);
  font-family: Interop;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const Detail = styled.div`
  align-self: stretch;
  color: var(--2024-logcon-60, #d9cbc7);
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

const Download = styled(Link)`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--2024-logcon-30, #3a312f);

  p {
    color: var(--2024-logcon-60, #d9cbc7);
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

const ConnectionInfo = styled.button<{ $isExpand: boolean }>`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: ${({ $isExpand }) =>
    $isExpand
      ? "var(--2024-logcon-main, #E5A692)"
      : "var(--2024-logcon-30, #3A312F)"};
  transition: background 0.2s, color 0.2s;

  p {
    color: ${({ $isExpand }) =>
      $isExpand
        ? "var(--2024-logcon-10, #1F1A18)"
        : "var(--2024-logcon-60, #D9CBC7)"};
    transition: background 0.2s, color 0.2s;
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

const Flag = styled.div<{ $isSolved: boolean }>`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;

  textarea,
  input {
    display: flex;
    padding: 12px 16px;
    height: 48px;
    align-items: center;
    flex: 1 0 0;
    border-radius: 8px 0px 0px 8px;
    background: var(--2024-logcon-30, #3a312f);
    resize: none;
    outline: none;
    border: none;
    color: ${({ $isSolved }) =>
      $isSolved
        ? "var(--2024-logcon-main, #E5A692)"
        : "var(--2024-logcon-50, #B2A8A4)"};
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
  background: var(--2024-logcon-main, #e5a692);
  color: var(--2024-logcon-10, #1f1a18);
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
  background: var(--2024-logcon-30, #3a312f);

  p {
    color: var(--2024-logcon-60, #d9cbc7);
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
  background: var(--2024-logcon-30, #3a312f);

  img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
`;
