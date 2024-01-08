import axios, { AxiosError } from "axios";
import { io } from "socket.io-client";

export const socketInstance = () => {
  const instance = io(process.env.NEXT_PUBLIC_API_URL || "");

  instance.on("connect", () => {
    console.log("socket connected");
  });

  instance.on("disconnect", () => {
    console.log("socket disconnected");
  });

  return instance;
};

export const apiInstance = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

async function refresh() {
  try {
    const res = await apiInstance().get("/auth/refresh");
    localStorage.setItem("accessToken", res.data);
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.setItem("accessToken", "");
      window.location.href = "/signin";
      throw new Error("Unauthorized");
    }
  }
}

export const authInstance = (retry?: boolean) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let originalRequest: Array<{
    url: string;
    method: string;
    data: string;
  }> = [];

  instance.interceptors.request.use(async (config) => {
    if (localStorage.getItem("accessToken") === "") await refresh();

    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    originalRequest.push({
      url: config.url || "",
      method: config.method || "",
      data: JSON.stringify(config.data) || "",
    });
    return config;
  });

  instance.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        return await refresh().then(async (res) => {
          if (!retry) return error;
          const data = await authInstance(true).request({
            method: originalRequest[0].method,
            url: originalRequest[0].url,
            data: originalRequest[0].data,
          });
          originalRequest = [];
          return data;
        });
      }
      return error;
    }
  );

  return instance;
};
