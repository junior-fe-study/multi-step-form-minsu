import { SubscriptionLayout } from "@/widgets/subscription-layout";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "w-full rounded-lg border p-3 text-black placeholder:text-gray-400 focus:outline-none",
  {
    variants: {
      state: {
        default: "border-gray-200 focus:border-[#6259FF]",
        error: "border-red-500 focus:border-red-500",
        success: "border-green-500 focus:border-green-500",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export const OneYourInfoStep = ({
  name,
  email,
  phone,
  handleNameChange,
  handleEmailChange,
  handlePhoneNumberChange,
  nextStep,
}: {
  name: string;
  email: string;
  phone: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) => {
  return (
    <SubscriptionLayout
      현재_단계={1}
      Content={
        <div className="">
          {/* Step Title, Description 영역 */}
          <h2 className="mb-[10px] text-3xl font-bold text-[#022959]">
            Personal info
          </h2>
          <p className="text-[#9699AA]">
            Please provide your name, email address, and phone number.
          </p>

          {/* Form 영역 */}
          <form className="mt-[40px]">
            {/* Name Input 영역 */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className={inputVariants({ state: "default" })}
              />
            </div>

            {/* Email Address Input 영역 */}
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className={inputVariants({ state: "default" })}
              />
            </div>

            {/* Phone Number Input 영역 */}
            <div className="mt-[24px] flex flex-col gap-[8px]">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneNumberChange}
                className={inputVariants({ state: "default" })}
              />
            </div>
          </form>

          {/* Next Step 버튼 영역 */}
          <div className="mt-[24px] flex justify-end">
            <button
              className="h-[48px] w-[123px] cursor-pointer rounded-lg bg-[#022959] text-[#fff]"
              onClick={nextStep}
            >
              Next Step
            </button>
          </div>
        </div>
      }
    />
  );
};
