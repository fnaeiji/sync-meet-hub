import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { createMeeting, Invitee, MeetingColor } from "@/store/meetings";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function NewMeeting() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState<string>(new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0,16));
  const [color, setColor] = useState<MeetingColor>("violet");
  const [emails, setEmails] = useState("");
  const [reminders, setReminders] = useState(true);

  function onCreate() {
    if (!title.trim()) {
      toast({ title: "Title is required" });
      return;
    }
    const invitees: Invitee[] = emails.split(/[,\n]/).map(e => e.trim()).filter(Boolean).map(email => ({ email, rsvp: "pending" }));
    const meeting = createMeeting({ title, description, start: new Date(start).toISOString(), color, invitees, reminders });
    toast({ title: "Meeting created", description: "Share the invite link to collect RSVPs." });
    navigate(`/m/${meeting.id}`);
  }

  return (
    <>
      <Helmet>
        <title>Create Meeting | SyncMeet</title>
        <meta name="description" content="Create a new meeting with title, description, time, invitees, color, and reminders." />
        <link rel="canonical" href={`${window.location.origin}/new`} />
      </Helmet>
      <AppLayout>
        <section className="max-w-2xl mx-auto card-elevated p-6">
          <h1 className="text-2xl font-semibold mb-4">Create a Meeting</h1>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sprint Planning" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Agenda, goals, context..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start">Date & Time</Label>
              <Input id="start" type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <Select value={color} onValueChange={(v) => setColor(v as MeetingColor)}>
                <SelectTrigger><SelectValue placeholder="Choose color" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="violet">Violet</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emails">Invitees (comma or new line separated emails)</Label>
              <Textarea id="emails" value={emails} onChange={(e) => setEmails(e.target.value)} placeholder="alice@acme.com, bob@acme.com" />
            </div>
            <div className="flex items-center gap-3">
              <input id="rem" type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="rem">Send reminder before meeting</Label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
              <Button variant="hero" onClick={onCreate}>Create</Button>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  );
}
