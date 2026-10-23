/**
 * Service scope as published on /our-services (F10). Wording is condensed,
 * not expanded — no tax preparation, CPA, legal or entity advice is implied.
 * Pending owner approval of exact scope and exclusions.
 */

export type Service = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "bookkeeping",
    title: "Monthly bookkeeping",
    summary: "Clean, current books and a month-end close you can count on.",
    includes: [
      "Month-end closing",
      "Weekly financial reports",
      "Process improvements for accuracy and efficiency",
    ],
  },
  {
    id: "payables",
    title: "Bills & payables",
    summary: "Vendor bills entered, verified and paid on time.",
    includes: [
      "Prepare, post and verify payables",
      "Process vendor payments",
      "Day-to-day transactions",
    ],
  },
  {
    id: "receivables",
    title: "Invoicing & receivables",
    summary: "Invoices out, payments in, and a clear view of who owes what.",
    includes: [
      "Invoicing and incoming payments",
      "Weekly A/R aging reports",
      "Customer collections",
      "Job cost verification, as needed",
    ],
  },
  {
    id: "payroll",
    title: "Payroll support",
    summary: "Help managing employee payroll in the system you already use.",
    includes: ["Managing employee payroll", "Gusto, ADP and QuickBooks payroll"],
  },
  {
    id: "training",
    title: "QuickBooks training",
    summary: "One-on-one or group sessions so your team feels at home in QuickBooks.",
    includes: ["1:1 or group training", "QuickBooks Online and Desktop"],
  },
];

export const extras = [
  "Document scanning",
  "New company set up",
  "New state set up",
  "In-house notary",
];

export const software: { group: string; items: string[] }[] = [
  {
    group: "Accounting",
    items: ["QuickBooks Online", "QuickBooks Desktop", "Xero", "Sage / Peachtree", "Patriot Software"],
  },
  { group: "Payroll", items: ["Gusto", "ADP", "QuickBooks Payroll"] },
  {
    group: "Integrations",
    items: ["AccuLynx", "Boostlingo", "QuickBooks POS", "Jobber", "AppFolio"],
  },
  { group: "Payments", items: ["Melio", "Zelle", "Vendor Cafe", "Buildertrend"] },
];
