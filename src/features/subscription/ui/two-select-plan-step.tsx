import { cn } from "@/shared/cn";
import { SubscriptionLayout } from "@/widgets/subscription-layout";
import Image from "next/image";
import { When } from "@modern-kit/react";
import { Iterator } from "@modern-kit/react";
import { Plan } from "../model/plan";

type PlanOption = {
  id: number;
  type: Plan;
  title: string;
  price: number;
  icon: string;
};

const planOptions: PlanOption[] = [
  {
    id: 1,
    type: "arcade",
    title: "Arcade",
    price: 9,
    icon: "/images/arcade.svg",
  },
  {
    id: 2,
    type: "advanced",
    title: "Advanced",
    price: 12,
    icon: "/images/advanced.svg",
  },
  {
    id: 3,
    type: "pro",
    title: "Pro",
    price: 15,
    icon: "/images/pro.svg",
  },
];

export const TwoSelectPlanStep = ({
  plan,
  handlePlanSelection,
  toggleBillingCycle,
  prevStep,
  nextStep,
}: {
  plan: {
    type: Plan;
    isYearly: boolean;
  };
  handlePlanSelection: (type: Plan) => void;
  toggleBillingCycle: () => void;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  return (
    <SubscriptionLayout
      현재_단계={2}
      Content={
        <div>
          {/* Step Title, Description 영역 */}
          <h2 className="mb-[10px] text-3xl font-bold text-[#022959]">
            Select your plan
          </h2>
          <p className="text-[#9699AA]">
            You have the option of monthly or yearly billing.
          </p>

          {/* Select Your Plan 영역 */}
          <div className="mt-[35px] grid grid-cols-3 gap-4">
            <Iterator
              itemKey={"id"}
              items={planOptions}
              renderItem={(option) => (
                <div
                  onClick={() => handlePlanSelection(option.type)}
                  className={cn(
                    "h-[183px] w-[138px] cursor-pointer rounded-lg border px-[16px] pt-[20px] pb-[16px] hover:border-[#6259FF]",
                    {
                      "border-[#6259FF] bg-[#F8F9FF]":
                        plan.type === option.type,
                      "border-gray-200": plan.type !== option.type,
                    },
                  )}
                >
                  <div className="mb-[35px] rounded-full bg-[#F8F9FF]">
                    <Image
                      src={option.icon}
                      alt={option.title}
                      width={40}
                      height={40}
                    />
                  </div>
                  <h3 className="mb-[5px] font-medium text-[#022959]">
                    {option.title}
                  </h3>
                  <p className="mb-[3px] text-gray-500">
                    ${plan.isYearly ? option.price * 10 : option.price}/
                    {plan.isYearly ? "yr" : "mo"}
                  </p>
                  <When condition={plan.isYearly}>
                    <p className="text-sm text-[#022959]">2 months free</p>
                  </When>
                </div>
              )}
            />
          </div>

          {/* Monthly / Yearly Switch 영역 */}
          <div className="mt-8 rounded-lg bg-[#F8F9FF] p-4">
            <div className="flex items-center justify-center gap-6">
              <span
                className={cn(
                  "font-medium",
                  !plan.isYearly ? "text-[#022959]" : "text-gray-400",
                )}
              >
                Monthly
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={plan.isYearly}
                  onChange={toggleBillingCycle}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-[#022959] after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
              </label>
              <span
                className={cn(
                  "font-medium",
                  plan.isYearly ? "text-[#022959]" : "text-gray-400",
                )}
              >
                Yearly
              </span>
            </div>
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
      }
    />
  );
};
