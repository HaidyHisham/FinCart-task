// Loading.tsx
import type { ReactNode } from "react";

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: ReactNode; 
};

export default function Loading({ loading, error, children }: LoadingProps) {
  if (loading === "pending") return <div>Loading…</div>;
  if (error) return <div className="text-danger">{error}</div>;
  return <>{children}</>;
}
