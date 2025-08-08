import { addDays, startOfWeek, format, isSameDay } from "date-fns";
import { Meeting } from "@/store/meetings";

interface Props {
  weekOf: Date; // any day within the target week
  meetings: Meeting[];
  onSelectMeeting?: (id: string) => void;
}

export default function WeeklyCalendar({ weekOf, meetings, onSelectMeeting }: Props) {
  const start = startOfWeek(weekOf);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const groups = days.map((d) => ({
    date: d,
    items: meetings.filter((m) => isSameDay(new Date(m.start), d)),
  }));

  return (
    <div className="grid md:grid-cols-7 gap-3">
      {groups.map((g) => (
        <section key={g.date.toISOString()} className="card-elevated p-3">
          <header className="mb-2">
            <div className="text-xs text-muted-foreground">{format(g.date, "EEE")}</div>
            <div className="font-medium">{format(g.date, "MMM d")}</div>
          </header>
          <div className="space-y-2">
            {g.items.length === 0 && (
              <p className="text-sm text-muted-foreground">No meetings</p>
            )}
            {g.items.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => onSelectMeeting?.(m.id)}
                className="w-full rounded px-2 py-2 text-left text-xs text-accent-foreground hover-lift"
                style={{ backgroundColor: `hsl(var(--event-${m.color}))` }}
                title={m.title}
              >
                <div className="font-medium truncate">{m.title}</div>
                <div className="opacity-80 truncate">{new Date(m.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
