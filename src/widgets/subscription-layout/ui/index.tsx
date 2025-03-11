import { ProgressSidebar } from "./progress-sidebar";

interface SubscriptionLayoutProps {
  CurrentStep: number;
  Content: React.ReactNode;
}

export const SubscriptionLayout = ({
  CurrentStep,
  Content,
}: SubscriptionLayoutProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F2F2F2]">
      <div className="flex h-[600px] w-[940px] gap-[100px] rounded-[15px] bg-white px-[16px] shadow-lg">
        {/* Left Progress Side Bar Area */}
        <ProgressSidebar CurrentStep={CurrentStep} />
        {/* Right Content Area */}
        <div className="mt-[56px]">{Content}</div>
      </div>
    </div>
  );
};
