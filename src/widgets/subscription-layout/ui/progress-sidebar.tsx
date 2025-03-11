import { Iterator } from "@modern-kit/react";
import { STEPS } from "../const/steps";
import { cn } from "@/shared/cn";

export const ProgressSidebar = ({ CurrentStep }: { CurrentStep: number }) => {
  return (
    <div className="mt-[16px] flex h-[568px] w-[274px] flex-col items-center justify-items-start gap-8 rounded-lg bg-[#6259FF] pt-[36px] pr-[32px]">
      <Iterator
        itemKey="number"
        items={STEPS}
        renderItem={(step) => (
          <div className="flex h-[33px] w-[133px] items-center justify-items-start gap-3">
            <div
              className={cn(
                "flex h-[33px] w-[33px] items-center justify-center rounded-full",
                {
                  "border bg-[#BEE2FD]": CurrentStep === step.number,
                  "border border-white": CurrentStep !== step.number,
                },
              )}
            >
              <p
                className={cn("text-[12px] font-bold", {
                  "text-black": CurrentStep === step.number,
                  "text-white": CurrentStep !== step.number,
                })}
              >
                {step.number}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-200">STEP {step.number}</p>
              <p className="text-[12px] font-bold text-gray-200">
                {step.title}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
