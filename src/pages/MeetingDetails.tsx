import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { getMeetingById, rsvpMeeting } from "@/store/meetings";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function MeetingDetails() {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const email = params.get("email") || '';
  const meeting = id ? getMeetingById(id) : undefined;

  if (!meeting) {
    return (
      <AppLayout>
        <p className="text-muted-foreground">Meeting not found.</p>
      </AppLayout>
    );
  }

  const handleRSVP = (answer: "attend" | "not_attend") => {
    if (!email) {
      toast({ title: "Missing email", description: "Open the invite link from your email to RSVP." });
      return;
    }
    rsvpMeeting(meeting.id, email, answer);
    toast({ title: "RSVP recorded", description: `You chose to ${answer === 'attend' ? 'attend' : 'not attend'}.` });
  };

  return (
    <>
      <Helmet>
        <title>{meeting.title} | SyncMeet</title>
        <meta name="description" content={`Details and RSVPs for ${meeting.title}`} />
        <link rel="canonical" href={`${window.location.origin}/m/${meeting.id}`} />
      </Helmet>
      <AppLayout>
        <article className="max-w-3xl mx-auto card-elevated p-6">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold mb-1">{meeting.title}</h1>
            <p className="text-muted-foreground">{new Date(meeting.start).toLocaleString()}</p>
          </header>
          {meeting.description && (
            <p className="mb-4 whitespace-pre-wrap">{meeting.description}</p>
          )}
          <section className="mb-6">
            <h2 className="font-medium mb-2">Invite link</h2>
            <div className="flex items-center gap-2">
              <input className="flex-1 px-3 py-2 rounded border bg-background" value={meeting.inviteLink} readOnly />
              <Button onClick={() => navigator.clipboard.writeText(meeting.inviteLink)}>Copy</Button>
            </div>
          </section>
          <section>
            <h2 className="font-medium mb-2">Invitees</h2>
            <ul className="space-y-2">
              {meeting.invitees.map((i) => (
                <li key={i.email} className="flex items-center justify-between rounded border px-3 py-2">
                  <span className="truncate">{i.email}</span>
                  <span className="text-sm text-muted-foreground">{i.rsvp || 'pending'}</span>
                </li>
              ))}
              {meeting.invitees.length === 0 && (
                <p className="text-sm text-muted-foreground">No invitees added.</p>
              )}
            </ul>
          </section>
          <hr className="my-6" />
          <section className="space-y-3">
            <h2 className="font-medium">Respond to invitation</h2>
            <p className="text-sm text-muted-foreground">Use this if you opened the link from your email (your email is included in the link).</p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => handleRSVP('attend')}>Attend</Button>
              <Button variant="outline" onClick={() => handleRSVP('not_attend')}>Not attend</Button>
            </div>
          </section>
          <footer className="mt-6">
            <Button variant="link" asChild>
              <Link to="/dashboard">Back to calendar</Link>
            </Button>
          </footer>
        </article>
      </AppLayout>
    </>
  );
}
