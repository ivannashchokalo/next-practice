import { RequestId, RequestItem } from "@/types/request";
import { api } from "./api";

interface CreateRequestBody {
  title: string;
  body: string;
  role: string;
  notifications: boolean;
  contactMethod: "email" | "phone";
  tags: string[];
}

export const getRequests = async () => {
  const { data } = await api.get<RequestItem[]>("/posts");
  return data;
};

export const deleteRequest = async (id: RequestId) => {
  const { data } = await api.delete<RequestItem>(`/posts/${id}`);
  return data;
};

export const getRequestById = async (id: RequestId) => {
  const { data } = await api.get<RequestItem>(`/posts/${id}`);
  return data;
};

export const createRequest = async (body: CreateRequestBody) => {
  const { data } = await api.post<RequestItem>("/posts", body);
  console.log(data);
  return data;
};
