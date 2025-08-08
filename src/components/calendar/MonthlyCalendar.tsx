import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay, format, eachDayOfInterval } from "date-fns";
import { Meeting } from "@/store/meetings";

interface Props {
  month: Date;
  meetings: Meeting[];
  onSelectDate?: (date: Date) => void;
  onSelectMeeting?: (id: string) => void;
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthlyCalendar({ month, meetings, onSelectDate, onSelectMeeting }: Props) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const meetingsByDay = new Map<string, Meeting[]>();
  meetings.forEach((m) => {
    const key = format(new Date(m.start), "yyyy-MM-dd");
    const arr = meetingsByDay.get(key) || [];
    arr.push(m);
    meetingsByDay.set(key, arr);
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 text-center text-sm text-muted-foreground mb-2">
        {dayNames.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const dayMeetings = meetingsByDay.get(key) || [];
          const isCurrentMonth = isSameMonth(day, monthStart);
          const today = isSameDay(day, new Date());
          return (
            <div
              key={key}
              className={`card-elevated p-2 min-h-28 ${!isCurrentMonth ? "opacity-50" : ""} ${today ? "ring-1 ring-sidebar-ring" : ""}`}
              onClick={() => onSelectDate?.(day)}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium">{format(day, "d")}</span>
                {today && <span className="px-1 rounded bg-secondary">Today</span>}
              </div>
              <div className="space-y-1">
                {dayMeetings.slice(0, 3).map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={(e) => { e.stopPropagation(); onSelectMeeting?.(m.id); }}
                    className={`w-full text-left text-xs rounded px-2 py-1 text-accent-foreground hover-lift`}
                    style={{ backgroundColor: `hsl(var(--event-${m.color}))` }}
                    title={m.title}
                  >
                    {m.title}
                  </button>
                ))}
                {dayMeetings.length > 3 && (
                  <div className="text-[11px] text-muted-foreground">+{dayMeetings.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
