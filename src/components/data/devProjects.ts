// components/devProjects.ts

export interface Project {
  app: string;
  foundation: string;
  description: string;
  link: string;
  photo: string;
}

export const devProjects = [
  {
    app: "Period.food",
    foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
    description:
      "A tool for women to make hormone-balancing choices based on the current day of their cycle.",
    link: "https://www.period.food/",
    photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/pf_mobile.png",
  },
  {
    app: "The Red Carpet Lookbook",
    foundation: "Full-Stack Web App (React, Node.js, S3)",
    description: "Browse and search for celebrity red carpet looks.",
    link: "https://www.celebritylookbook.com/",
    photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/oscar_mobile.png",
  },
  {
    app: "Film Script BreakDown",
    foundation: "O&O AI model",
    description:
      "Generates production tools such as shooting schedules, D.O.O.D., prop & wardrobe lists, etc., from a PDF script.",
    link: "/script",
    photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/hold_mobile.png",
  },
  {
    app: "Dashboard",
    foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
    description: "Listing of media assets and performance metrics.",
    link: "https://lb-front2.vercel.app",
    photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/hold_mobile.png",
  },
] satisfies Project[];
