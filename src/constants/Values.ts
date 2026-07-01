import { Href } from "expo-router";

export const Spaces: {
  title: string;
  description: string;
  link: Href;
  image: string;
}[] = [
  {
    title: "Everyday",
    description: "Stay on top of your finances with our tools and insights",
    link: "/(root)/(tabs)",
    image: "",
  },
  {
    title: "Save & Invest",
    description: "Build your financial future and track your growth",
    link: "/coming-soon",
    image: "",
  },
  {
    title: "Borrow",
    description: "Check your credit score and see your borrowing options",
    link: "/coming-soon",
    image: "",
  },
  {
    title: "Insure",
    description: "View your cover and explore your options all in one place",
    link: "/coming-soon",
    image: "",
  },
];

export type CardManagementItem = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: Href;
};

export type CardManagementSection = {
  id: string;
  subtitle: string;
  data: CardManagementItem[];
};

export const CardManagementData: CardManagementSection[] = [
  {
    id: "card_details_section",
    subtitle: "Card Details",
    data: [
      {
        id: "view_pin",
        label: "View PIN",
        description: "Access your card PIN securely.",
        icon: "key", // Icon name for display
        href: "/view-pin",
      },
      {
        id: "view_card_details",
        label: "View Card Details",
        description: "See your card number, expiry date, and CVV.",
        icon: "card-outline",
        href: "/card-details",
      },
    ],
  },
  {
    id: "card_controls_section",
    subtitle: "Card Controls",
    data: [
      {
        id: "card_freezes_limits",
        label: "Card Freezes and Limits",
        description: "Control your spending limits and freeze your card.",
        icon: "lock-closed-outline",
        href: "/",
      },
      {
        id: "lost_stolen_cards",
        label: "Lost or Stolen Cards",
        description: "Report lost or stolen cards and order a replacement.",
        icon: "alert-circle-outline",
        href: "/",
      },
      {
        id: "replace_card_pin",
        label: "Replace Card & PIN",
        description: "Order a new card or PIN if needed.",
        icon: "refresh-outline",
        href: "/",
      },
    ],
  },
  {
    id: "spending_options_section",
    subtitle: "Spending Options",
    data: [
      {
        id: "apple_pay",
        label: "Apple Pay",
        description: "Set up your card for Apple Pay.",
        icon: "logo-apple",
        href: "/",
      },
      {
        id: "click_to_pay",
        label: "Click to Pay",
        description: "Enable Click to Pay for faster online payments.",
        icon: "wallet-outline",
        href: "/",
      },
    ],
  },
];
