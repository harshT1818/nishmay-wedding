export type WeddingEvent = {
  id: string;
  name: string;

  date?: string;
  time?: string;

  location: string;

  venue?: string;
  address?: string;
  mapsUrl?: string;

  description?: string;
  dressCode?: string;
  instructions?: string;
};

export type Invitation = {
  id: string;
  guestName: string;
  events: WeddingEvent[];
};