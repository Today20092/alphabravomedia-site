const publicTallyContactFormUrl = import.meta.env.PUBLIC_TALLY_CONTACT_FORM_URL ?? "";

export const siteConfig = {
  siteName: "Alpha Bravo Media",
  siteUrl: "https://alphabravomedia.co",
  tagline: "Cinema-grade videography for brands and creators.",
  defaultDescription:
    "Tampa video production for brands, podcasts, events, and creator-led businesses. Strategy, filming, editing, and delivery from one production partner.",
  founderName: "Ayoub",
  founderTitle: "Founder and lead producer",
  locationLabel: "Tampa, Florida",
  email: "contact@alphabravomedia.co",
  phone: "(813) 665-0166",
  phoneRaw: "+18136650166",
  contactFormUrl: publicTallyContactFormUrl,
  elementUsername: "@ayoubab:matrix.org",
  googleMapsUrl: "https://maps.app.goo.gl/8aHq1mHx7L9Q8z4A8",
  googleMapsLabel: "See our reviews on Google Maps",
  googleReviewUrl: "https://g.page/r/CYI5X3BVmD1sEBM/review",
  googleReviewLabel: "Leave a review",
  socialLinks: [
    {
      platform: "discord",
      label: "Discord",
      href: "https://discord.gg/5C8yFbzv77",
      icon: "simple-icons:discord",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@alphabravomedia",
      icon: "simple-icons:youtube",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://instagram.com/alphabravomedia",
      icon: "simple-icons:instagram",
    },
  ],
} as const;
