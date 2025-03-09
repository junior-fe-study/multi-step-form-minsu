import { cn } from "@/shared/cn";
import { SubscriptionLayout } from "@/widgets/subscription-layout";
import { Iterator } from "@modern-kit/react";

type PlanType = "arcade" | "advanced" | "pro";

type Addon = {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  price: number;
};

const ADDONS: Addon[] = [
  {
    id: 1,
    title: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    id: 2,
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    id: 3,
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];

export const ThreeAddOnsStep = ({
  plan,
  addons,
  handleAddonToggle,
  prevStep,
  nextStep,
}: {
  plan: {
    type: PlanType;
    isYearly: boolean;
  };
  addons: Addon[];
  handleAddonToggle: (addon: Addon) => void;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  return (
    <SubscriptionLayout
      현재_단계={3}
      Content={
        <div>
          {/* Step Title, Description 영역 */}
          <h2 className="mb-[10px] text-3xl font-bold text-[#022959]">
            Select your plan
          </h2>
          <p className="text-[#9699AA]">
            You have the option of monthly or yearly billing.
          </p>

          {/* Add Ons Select 영역 */}
          <div className="mt-[35px] w-[450px] space-y-4">
            <Iterator
              itemKey={"id"}
              items={ADDONS}
              renderItem={(addon) => {
                const isSelected = addons.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:border-[#6259FF]",
                      {
                        "border-[#6259FF] bg-[#F8F9FF]": isSelected,
                        "border-gray-200": !isSelected,
                      },
                    )}
                    onClick={() => handleAddonToggle(addon)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAddonToggle(addon)}
                      className="h-5 w-5 rounded border-gray-300 text-[#6259FF] focus:ring-[#6259FF]"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-[#022959]">
                        {addon.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {addon.description}
                      </p>
                    </div>
                    <p className="text-sm text-[#6259FF]">
                      +${plan.isYearly ? addon.price * 10 : addon.price}/
                      {plan.isYearly ? "yr" : "mo"}
                    </p>
                  </div>
                );
              }}
            />
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
