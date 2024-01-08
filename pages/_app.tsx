import "@/styles/globals.css";
import "@/styles/fonts.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import UserInfoRoot from "@/components/Content/UserInfoRoot";
import { QueryClientProvider, QueryClient } from "react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <UserInfoRoot>
          <Component {...pageProps} />
        </UserInfoRoot>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
