import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import { useMemo, useState } from "react";
import { getMeetings } from "@/store/meetings";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [view, setView] = useState<"month" | "week">("month");
  const [month, setMonth] = useState<Date>(new Date());
  const meetings = useMemo(() => getMeetings(), []);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dashboard | SyncMeet</title>
        <meta name="description" content="View your meetings in monthly and weekly calendars. Color-coded events for clarity." />
        <link rel="canonical" href={`${window.location.origin}/dashboard`} />
      </Helmet>
      <AppLayout>
        <section className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Your Calendar</h1>
          <div className="inline-flex rounded-md border">
            <button className={`px-3 py-1 text-sm ${view === 'month' ? 'bg-secondary' : ''}`} onClick={() => setView('month')}>Month</button>
            <button className={`px-3 py-1 text-sm ${view === 'week' ? 'bg-secondary' : ''}`} onClick={() => setView('week')}>Week</button>
          </div>
        </section>
        {view === "month" ? (
          <MonthlyCalendar month={month} meetings={meetings} onSelectMeeting={(id) => navigate(`/m/${id}`)} />
        ) : (
          <WeeklyCalendar weekOf={month} meetings={meetings} onSelectMeeting={(id) => navigate(`/m/${id}`)} />
        )}
      </AppLayout>
    </>
  );
}
