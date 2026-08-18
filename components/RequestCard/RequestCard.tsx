import { RequestItem } from "@/types/request";
import Link from "next/link";

export default function RequestCard({
  request,
  onDelete,
}: {
  request: RequestItem;
  onDelete: (value: number) => void;
}) {
  return (
    <li
      style={{
        width: 300,
        border: "1px solid black",
        borderRadius: "15px",
        padding: "20px",
      }}
    >
      <p>Title: {request.title}</p>
      <p>{request.body}</p>
      <button onClick={() => onDelete(request.id)}>delete</button>
      <Link href={`requests/${request.id}`}>details</Link>
    </li>
  );
}
