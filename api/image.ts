import { apiInstance } from ".";

export async function uploadImage(file: FormData) {
  const res = await apiInstance(false).post(
    "https://cdn.plebea.com/upload",
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}
