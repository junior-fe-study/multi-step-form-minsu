import { SubscriptionLayout } from "@/widgets/subscription-layout";
import { When } from "@modern-kit/react";

export const FourSummaryStep = ({
  이전_스탭_이동,
  다음_스탭_이동,
}: {
  이전_스탭_이동: () => void;
  다음_스탭_이동: () => void;
}) => {
  return (
    <SubscriptionLayout
      현재_단계={4}
      Content={
        <div>
          {/* Step Title, Description 영역 */}
          <h2 className="mb-[10px] text-3xl font-bold text-[#022959]">
            Finishing up
          </h2>
          <p className="text-[#9699AA]">
            Double-check everything looks OK before confirming.
          </p>
        </div>
      }
    />
  );
};
