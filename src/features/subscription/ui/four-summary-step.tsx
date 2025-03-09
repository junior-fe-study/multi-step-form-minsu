import { SubscriptionLayout } from "@/widgets/subscription-layout";
import { When } from "@modern-kit/react";

type Addon = {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  price: number;
};

type PlanType = "arcade" | "advanced" | "pro";

export const FourSummaryStep = ({
  plan,
  addons,
  planPrice,
  total,
  handleChangePlan,
  prevStep,
  nextStep,
}: {
  plan: {
    type: PlanType;
    isYearly: boolean;
  };
  addons: Addon[];
  planPrice: number;
  total: number;
  handleChangePlan: () => void;
  prevStep: () => void;
  nextStep: () => void;
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

          {/* 최종 Price 계산 영역 */}
          <div className="w-full max-w-[450px] space-y-6">
            <div className="space-y-4 rounded-lg bg-[#F8F9FF] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#022959]">
                    {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)} (
                    {plan.isYearly ? "Yearly" : "Monthly"})
                  </h3>
                  <button
                    onClick={handleChangePlan}
                    className="text-gray-400 underline hover:text-[#6259FF]"
                  >
                    Change
                  </button>
                </div>
                <p className="font-medium text-[#022959]">
                  ${planPrice}/{plan.isYearly ? "yr" : "mo"}
                </p>
              </div>

              <When condition={addons.length > 0}>
                <>
                  <hr className="border-gray-200" />
                  <div className="space-y-3">
                    {addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between"
                      >
                        <p className="text-gray-400">{addon.title}</p>
                        <p className="text-[#022959]">
                          +$
                          {addon.price * (plan.isYearly ? 10 : 1)}/
                          {plan.isYearly ? "yr" : "mo"}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              </When>
            </div>

            <div className="flex items-center justify-between px-6">
              <p className="text-gray-400">
                Total (per {plan.isYearly ? "year" : "month"})
              </p>
              <p className="text-xl font-bold text-[#6259FF]">
                +${total}/{plan.isYearly ? "yr" : "mo"}
              </p>
            </div>

            {/* Prev / Next Step 버튼 영역 */}
            <div className="mt-[24px] flex justify-between">
              <button
                onClick={prevStep}
                className="h-[48px] w-[123px] cursor-pointer rounded-lg text-[#9699AA]"
              >
                Go Back
              </button>
              <button
                onClick={nextStep}
                className="h-[48px] w-[123px] cursor-pointer rounded-lg bg-[#022959] text-[#fff]"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};
