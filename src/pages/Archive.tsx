import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { listPast } from "@/store/meetings";

export default function Archive() {
  const past = listPast();
  return (
    <>
      <Helmet>
        <title>Archive | SyncMeet</title>
        <meta name="description" content="Browse your archive of past meetings, including titles, dates, and RSVP summaries." />
        <link rel="canonical" href={`${window.location.origin}/archive`} />
      </Helmet>
      <AppLayout>
        <h1 className="text-2xl font-semibold mb-4">Past Meetings</h1>
        <div className="grid gap-3">
          {past.length === 0 && (
            <p className="text-muted-foreground">No past meetings yet.</p>
          )}
          {past.map((m) => (
            <article key={m.id} className="card-elevated p-4">
              <h2 className="font-medium">{m.title}</h2>
              <p className="text-sm text-muted-foreground">{new Date(m.start).toLocaleString()}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                RSVPs: {m.invitees.filter(i => i.rsvp === 'attend').length} attending • {m.invitees.filter(i => i.rsvp === 'not_attend').length} not attending
              </div>
            </article>
          ))}
        </div>
      </AppLayout>
    </>
  );
}
