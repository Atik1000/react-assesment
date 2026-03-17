import { Skeleton } from "antd";

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <Skeleton.Button block active size="large" />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );
}
