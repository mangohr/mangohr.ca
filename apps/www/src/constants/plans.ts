export const plans = [
  {
    title: "CoreHR",
    desc: "Our free tier provides you",
    highlight: false,
    stripe: {
      price_id: null,
    },
    monthly_amounts: {
      cad: 0,
    },
    yearly_amount: {
      cad: 0,
    },
    button_name: "Join Now",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
  {
    title: "Essentials",
    desc: "Our free tier provides you",
    highlight: true,
    stripe: {
      price_id: "price_1QokiiHMqZnj0TabCstCNvXy",
    },
    monthly_amounts: {
      cad: 6,
    },
    yearly_amount: {
      cad: 6,
    },
    button_name: "Buy Now",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
  {
    title: "Premium",
    desc: "Our free tier provides you",
    highlight: false,
    stripe: {
      price_id: "price_1QojuwHMqZnj0TabuZmR0Qu0",
    },
    monthly_amounts: {
      cad: 8,
    },
    yearly_amount: {
      cad: 8,
    },
    button_name: "Buy Now",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
]
