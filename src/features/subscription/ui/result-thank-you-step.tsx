import { SubscriptionLayout } from "@/widgets/subscription-layout";
import Image from "next/image";

export const ResultThankYouStep = () => {
  return (
    <SubscriptionLayout
      CurrentStep={4}
      Content={
        <div className="mt-[100px] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src="/images/check.svg"
              alt="Thank you"
              width={80}
              height={80}
            />
            <h1 className="text-[32px] font-bold text-black">Thank you!</h1>
            <p className="w-[450px] flex-wrap text-center text-[16px] text-gray-500">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </div>
      }
    />
  );
};
