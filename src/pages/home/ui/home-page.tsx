"use client";

import {
  FourSummaryStep,
  OneYourInfoStep,
  ResultThankYouStep,
  ThreeAddOnsStep,
  TwoSelectPlanStep,
} from "@/features/subscription";
import { createFunnelSteps, useFunnel } from "@use-funnel/browser";

type Addon = {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  price: number;
};

interface SubscriptionFunnelContext {
  name: string;
  email: string;
  phone: string;
  plan: {
    type: "arcade" | "advanced" | "pro";
    isYearly: boolean;
  };
  addons: Addon[];
}

export default function HomePage() {
  const steps = createFunnelSteps<Partial<SubscriptionFunnelContext>>()
    .extends("YourInfo", { requiredKeys: ["name", "email", "phone"] })
    .extends("SelectPlan", { requiredKeys: ["plan"] })
    .extends("AddOns", { requiredKeys: ["addons"] })
    .extends("Summary")
    .extends("ThankYou")
    .build();

  const subscribe = useFunnel({
    id: "subscription-funnel",
    steps,
    initial: {
      step: "YourInfo",
      context: {
        name: "",
        email: "",
        phone: "",
        plan: {
          type: "arcade",
          isYearly: false,
        },
        addons: [],
      },
    },
  });
  console.log(subscribe.context);
  return (
    <subscribe.Render
      YourInfo={({ history, context }) => (
        <OneYourInfoStep
          name={context.name}
          email={context.email}
          phone={context.phone}
          handleNameChange={(e) =>
            history.push("YourInfo", { ...context, name: e.target.value })
          }
          handleEmailChange={(e) =>
            history.push("YourInfo", { ...context, email: e.target.value })
          }
          handlePhoneNumberChange={(e) =>
            history.push("YourInfo", { ...context, phone: e.target.value })
          }
          nextStep={() =>
            history.push("SelectPlan", {
              ...context,
              plan: {
                type: "arcade",
                isYearly: false,
              },
            })
          }
        />
      )}
      SelectPlan={({ history, context }) => (
        <TwoSelectPlanStep
          plan={context.plan!}
          handlePlanSelection={(
            selectedPlanType: "arcade" | "advanced" | "pro",
          ) =>
            history.push("SelectPlan", {
              ...context,
              plan: { ...context.plan, type: selectedPlanType },
            })
          }
          toggleBillingCycle={() =>
            history.push("SelectPlan", {
              ...context,
              plan: { ...context.plan, isYearly: !context.plan.isYearly },
            })
          }
          prevStep={() =>
            history.push("YourInfo", {
              name: context.name,
              email: context.email,
              phone: context.phone,
            })
          }
          nextStep={() =>
            history.push("AddOns", {
              ...context,
              addons: [],
            })
          }
        />
      )}
      AddOns={({ history, context }) => (
        <ThreeAddOnsStep
          plan={context.plan}
          addons={context.addons || []}
          handleAddonToggle={(addon) => {
            const currentAddons = context.addons || [];
            const newAddons = currentAddons.some((a) => a.id === addon.id)
              ? currentAddons.filter((a) => a.id !== addon.id)
              : [...currentAddons, addon];

            history.push("AddOns", {
              ...context,
              addons: newAddons,
            });
          }}
          prevStep={() =>
            history.push("SelectPlan", {
              name: context.name,
              email: context.email,
              phone: context.phone,
              plan: context.plan,
            })
          }
          nextStep={() => history.push("Summary", context)}
        />
      )}
      Summary={({ history, context }) => (
        <FourSummaryStep
          plan={context.plan}
          addons={context.addons}
          planPrice={(() => {
            const planPrices = {
              arcade: 9,
              advanced: 12,
              pro: 15,
            };

            // 기본 가격 계산
            const basePrice = planPrices[context.plan.type];

            // 연간/월간 구독에 따른 가격 조정
            return basePrice * (context.plan.isYearly ? 10 : 1);
          })()}
          total={(() => {
            const planPrices = {
              arcade: 9,
              advanced: 12,
              pro: 15,
            };

            // 기본 플랜 가격 계산
            const basePrice = planPrices[context.plan.type];
            const planPrice = basePrice * (context.plan.isYearly ? 10 : 1);

            const addonsTotal = context.addons.reduce((sum, addon) => {
              return sum + addon.price * (context.plan.isYearly ? 10 : 1);
            }, 0);

            // 총액 계산
            return planPrice + addonsTotal;
          })()}
          handleChangePlan={() =>
            history.push("SelectPlan", {
              name: context.name,
              email: context.email,
              phone: context.phone,
              plan: context.plan,
              addons: context.addons,
            })
          }
          prevStep={() =>
            history.push("AddOns", {
              name: context.name,
              email: context.email,
              phone: context.phone,
              plan: context.plan,
              addons: context.addons,
            })
          }
          nextStep={() => history.push("ThankYou", context)}
        />
      )}
      ThankYou={() => <ResultThankYouStep />}
    />
  );
}
