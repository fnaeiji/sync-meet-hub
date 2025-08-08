import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import hero from "@/assets/syncmeet-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>SyncMeet — Group Calendar & Meeting Management</title>
        <meta name="description" content="Create, manage, and track group meetings with calendar views, invitations, RSVPs, reminders, and archives." />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SyncMeet",
          description: "Group calendar and meeting management",
          applicationCategory: "BusinessApplication",
        })}</script>
      </Helmet>
      <AppLayout>
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">SyncMeet — Group Meeting Manager</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Plan meetings, invite teammates, track RSVPs, and view everything in beautiful monthly and weekly calendars.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" onClick={() => navigate("/new")}>Create a meeting</Button>
              <Button variant="secondary" asChild>
                <Link to="/dashboard">Open dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
          <div className="card-elevated overflow-hidden">
            <img src={hero} alt="SyncMeet hero dashboard with calendar and meetings" loading="lazy" className="w-full h-auto" />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default Index;
