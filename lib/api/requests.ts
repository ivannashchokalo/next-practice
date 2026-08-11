import { RequestId, RequestItem } from "@/types/request";
import { api } from "./api";

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
