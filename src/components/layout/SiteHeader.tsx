import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>SyncMeet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant={pathname === "/archive" ? "secondary" : "ghost"} asChild>
            <Link to="/archive">Archive</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/new">New Meeting</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
