"use client";
import { useParams } from "next/navigation";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  return <div>property details page {id}</div>;
}
