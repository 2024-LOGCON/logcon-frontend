import { socketInstance } from "@/api";
import { useSyncNotice } from "@/hooks/notice";
import { useAdmin, useUserInfo } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}

export default function UserInfoRoot({ children }: Props) {
  const router = useRouter();
  const { data: isAdmin } = useAdmin();

  const { mutate } = useSyncNotice();

  useEffect(() => {
    if (isAdmin?.status === undefined) return;
    if (router.pathname.includes("admin") && !isAdmin?.status) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, isAdmin?.status]);

  useEffect(() => {
    const ws = socketInstance();
    ws.on("notice", (data) => {
      toast("새로운 공지사항이 있습니다.");
      mutate();
    });

    return () => {
      ws.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>2024 LOGCON</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <>{children}</>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={true} // 진행시간바 숨김
        onClick={() => router.push("/notice")}
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="dark"
        limit={1} // 알람 개수 제한
      />
    </>
  );
}
