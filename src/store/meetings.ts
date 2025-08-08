export type RSVPStatus = "attend" | "not_attend" | "pending";
export type MeetingStatus = "upcoming" | "completed" | "cancelled";
export type MeetingColor = "blue" | "violet" | "green" | "orange";

export interface Invitee {
  email: string;
  name?: string;
  rsvp: RSVPStatus;
  respondedAt?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO
  end?: string;  // ISO
  color: MeetingColor;
  invitees: Invitee[];
  inviteLink: string;
  reminders: boolean;
  createdAt: string;
  status: MeetingStatus;
}

const STORAGE_KEY = "syncmeet.meetings.v1";

function read(): Meeting[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Meeting[]) : [];
  } catch {
    return [];
  }
}

function write(meetings: Meeting[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
}

export function getMeetings(): Meeting[] {
  return read();
}

export function getMeetingById(id: string): Meeting | undefined {
  return read().find((m) => m.id === id);
}

export function saveMeeting(meeting: Meeting) {
  const all = read();
  const idx = all.findIndex((m) => m.id === meeting.id);
  if (idx >= 0) all[idx] = meeting; else all.unshift(meeting);
  write(all);
}

export function updateMeeting(id: string, patch: Partial<Meeting>) {
  const all = read();
  const idx = all.findIndex((m) => m.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...patch };
    write(all);
  }
}

export function createMeeting(input: Omit<Meeting, "id" | "createdAt" | "status" | "inviteLink">): Meeting {
  const id = crypto.randomUUID();
  const inviteLink = `${window.location.origin}/m/${id}`;
  const meeting: Meeting = {
    id,
    createdAt: new Date().toISOString(),
    status: new Date(input.start) < new Date() ? "completed" : "upcoming",
    inviteLink,
    ...input,
  };
  saveMeeting(meeting);
  return meeting;
}

export function rsvpMeeting(meetingId: string, email: string, rsvp: RSVPStatus) {
  const all = read();
  const idx = all.findIndex((m) => m.id === meetingId);
  if (idx < 0) return;
  const meeting = all[idx];
  const invIdx = meeting.invitees.findIndex((i) => i.email.toLowerCase() === email.toLowerCase());
  if (invIdx >= 0) {
    meeting.invitees[invIdx] = { ...meeting.invitees[invIdx], rsvp, respondedAt: new Date().toISOString() };
  } else {
    meeting.invitees.push({ email, rsvp, respondedAt: new Date().toISOString() });
  }
  all[idx] = meeting;
  write(all);
}

export function listUpcoming(): Meeting[] {
  const now = new Date();
  return read()
    .map((m) => ({ ...m, status: new Date(m.start) < now ? "completed" : m.status }))
    .filter((m) => new Date(m.start) >= now && m.status !== "cancelled")
    .sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

export function listPast(): Meeting[] {
  const now = new Date();
  return read()
    .map((m) => ({ ...m, status: new Date(m.start) < now ? "completed" : m.status }))
    .filter((m) => new Date(m.start) < now)
    .sort((a, b) => +new Date(b.start) - +new Date(a.start));
}
