import { SubscriptionLayout } from "@/widgets/subscription-layout";

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
                className={
                  "w-full rounded-lg border border-gray-200 p-3 text-black placeholder:text-gray-400 focus:border-[#6259FF]"
                }
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
                className={
                  "w-full rounded-lg border border-gray-200 p-3 text-black placeholder:text-gray-400 focus:border-[#6259FF]"
                }
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
                className={
                  "w-full rounded-lg border border-gray-200 p-3 text-black placeholder:text-gray-400 focus:border-[#6259FF]"
                }
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
