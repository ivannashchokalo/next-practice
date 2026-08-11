export interface RequestItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type RequestId = RequestItem["id"];
