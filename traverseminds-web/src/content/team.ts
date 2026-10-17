// Team shown on About: seed source for Sanity "teamMember" documents and the offline fallback.
export type TeamContent = { name: string; title: string; division: string; photo: string; linkedIn?: string };

export const TEAM: TeamContent[] = [
  {
    name: "Masiika Christine Thembo",
    title: "Founder & CEO",
    division: "Leadership",
    photo: "/christine-masika.jpg",
    linkedIn: "https://linkedin.com/in/christinemasika",
  },
];
