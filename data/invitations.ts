import type { Invitation } from "@/types/invitation";

const events = {
  kankotri: {
    id: "kankotri",
    name: "Kankotri Lekhan",
    location: "Mumbai",
    date: "Date TBD",
    time: "Time TBD",
    description: "An auspicious beginning to the wedding celebrations.",
  },

  mehendi: {
    id: "mehendi",
    name: "Mehendi",
    location: "Mumbai",
    date: "Date TBD",
    time: "Time TBD",
    description: "An evening of colour, laughter and mehendi.",
  },

  rituals: {
    id: "rituals",
    name: "Ganpati • Grah Shanti • Haldi • Mameru",
    location: "Mumbai",
    date: "15 February 2027",
    time: "Time TBD",
    description: "A day of blessings and family traditions.",
  },

  sangeet: {
    id: "sangeet",
    name: "Engagement • Sangeet",
    location: "Mumbai",
    date: "15 February 2027",
    time: "Time TBD",
    description: "Music, celebrations and a little dancing.",
  },

  marriage: {
    id: "marriage",
    name: "Marriage",
    location: "Airoli, Navi Mumbai",
    date: "15 February 2027",
    time: "Time TBD",
    description: "The day we celebrate Nishita & Mayur.",
  },
};

export const invitations: Record<string, Invitation> = {
  "demo-all": {
    id: "demo-all",
    guestName: "Harsh & Family",
    events: [
      events.kankotri,
      events.mehendi,
      events.rituals,
      events.sangeet,
      events.marriage,
    ],
  },

  "demo-wedding-only": {
    id: "demo-wedding-only",
    guestName: "Wedding Guest",
    events: [events.marriage],
  },
};

export function getInvitation(id: string): Invitation | null {
  return invitations[id] ?? null;
}