import { socketInstance } from "@/api";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function UserInfoRoot({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const ws = socketInstance();
    ws.on("notice", (data) => {
      console.log(data);
    });

    return () => {
      ws.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return <>{children}</>;
}
