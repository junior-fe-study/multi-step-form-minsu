import { ProgressSidebar } from "./progress-sidebar";

interface SubscriptionLayoutProps {
  현재_단계: number;
  Content: React.ReactNode;
}

export const SubscriptionLayout = ({
  현재_단계,
  Content,
}: SubscriptionLayoutProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F2F2F2]">
      <div className="flex h-[600px] w-[940px] gap-[100px] rounded-[15px] bg-white px-[16px] shadow-lg">
        {/* 왼쪽 Progress Side Bar 영역 */}
        <ProgressSidebar 현재_단계={현재_단계} />
        {/* 오른쪽 Content 영역 */}
        <div className="mt-[56px]">{Content}</div>
      </div>
    </div>
  );
};
