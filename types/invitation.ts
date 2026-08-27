export type WeddingEvent = {
  id: string;
  name: string;
  date?: string;
  time?: string;
  location: string;
  description?: string;
  mapsUrl?: string;
};

export type Invitation = {
  id: string;
  guestName: string;
  events: WeddingEvent[];
};