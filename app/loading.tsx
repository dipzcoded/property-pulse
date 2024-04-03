"use client";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  loading: boolean;
};

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

export default function LoadingPage({ loading }: Props) {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
