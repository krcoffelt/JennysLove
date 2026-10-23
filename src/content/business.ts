/**
 * Single source of business truth.
 *
 * Every value is an observation from the public research snapshot
 * (reports/rebuild-brief.md §6, inventories/business-facts.json).
 * Nothing here is owner-approved yet — keep `approval` current and
 * update `verified` whenever a fact is re-checked.
 */

type Approval = "pending owner confirmation" | "approved";

export type Fact<T> = {
  value: T;
  source: string;
  approval: Approval;
  verified: string; // ISO date the source last displayed this value
};

const fact = <T,>(value: T, source: string, verified = "2026-10-16"): Fact<T> => ({
  value,
  source,
  approval: "pending owner confirmation",
  verified,
});

export const business = {
  name: fact("Jenny’s Love Accounting", "https://www.jennyslove.com/ (F01)"),
  owner: fact("Jenny", "https://www.jennyslove.com/about (F09)"),
  phone: fact(
    { display: "816-213-5685", href: "tel:+18162135685" },
    "https://www.jennyslove.com/contact (F02)",
  ),
  email: fact("jenny@jennyslove.com", "https://www.jennyslove.com/contact (F03)"),
  address: fact(
    {
      street: "5032 NE Parvin Rd",
      city: "Kansas City",
      region: "MO",
      postalCode: "64117",
      directions:
        "https://www.google.com/maps/search/?api=1&query=5032+NE+Parvin+Rd+Kansas+City+MO+64117",
    },
    "https://www.jennyslove.com/contact (F04)",
  ),
  /**
   * Google Maps hours (F06), chosen by the client on 2026-10-23 as the published hours.
   * The old website showed Mon–Sat 8AM–7PM (F05). Times are America/Chicago.
   */
  hours: {
    value: [{ days: "Every day", time: "7am – 8pm" }],
    source: "https://www.google.com/maps?cid=5852854765743201467 (F06)",
    approval: "approved",
    verified: "2026-10-16",
  } as Fact<{ days: string; time: string }[]>,
  experience: fact("20+ years in accounting", "https://www.jennyslove.com/about (F09)"),
  googleProfile: fact(
    "https://www.google.com/maps?cid=5852854765743201467",
    "Google Maps profile (F07)",
  ),
} as const;

export const site = {
  url: "https://www.jennyslove.com",
  timezone: "America/Chicago",
};
