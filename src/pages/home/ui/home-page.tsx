"use client";

import {
  Addon,
  FourSummaryStep,
  OneYourInfoStep,
  Plan,
  PLAN_PRICES,
  ResultThankYouStep,
  ThreeAddOnsStep,
  TwoSelectPlanStep,
} from "@/features/subscription";
import { createFunnelSteps, useFunnel } from "@use-funnel/browser";

interface SubscriptionFunnelContext {
  name: string;
  email: string;
  phone: string;
  plan: {
    type: Plan;
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
          handlePlanSelection={(selectedPlanType: Plan) =>
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
            // Base price calculation
            const basePrice = PLAN_PRICES[context.plan.type];

            // Adjust price based on yearly/monthly subscription
            return basePrice * (context.plan.isYearly ? 10 : 1);
          })()}
          total={(() => {
            // Base plan price calculation
            const basePrice = PLAN_PRICES[context.plan.type];
            const planPrice = basePrice * (context.plan.isYearly ? 10 : 1);

            const addonsTotal = context.addons.reduce((sum, addon) => {
              return sum + addon.price * (context.plan.isYearly ? 10 : 1);
            }, 0);

            // Total amount calculation
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
