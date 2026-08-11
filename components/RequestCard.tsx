import { RequestItem } from "@/types/request";

export default function RequestCard({
  request,
  onDelete,
}: {
  request: RequestItem;
  onDelete: (value: number) => void;
}) {
  return (
    <li>
      <p>Title: {request.title}</p>
      <p>{request.body}</p>
      <button onClick={() => onDelete(request.id)}>delete</button>
    </li>
  );
}
