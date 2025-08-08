import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthProvider";

const SiteHeader = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>SyncMeet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant={pathname === "/archive" ? "secondary" : "ghost"} asChild>
                <Link to="/archive">Archive</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/new">New Meeting</Link>
              </Button>
              <Button variant="ghost" onClick={async () => { await signOut(); navigate("/login"); }}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
