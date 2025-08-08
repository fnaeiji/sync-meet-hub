import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error });
    } else {
      toast({ title: "Welcome back" });
      const to = location.state?.from?.pathname || "/dashboard";
      navigate(to, { replace: true });
    }
  };

  return (
    <>
      <Helmet>
        <title>Log in | SyncMeet</title>
        <meta name="description" content="Log in to access your SyncMeet dashboard and meetings." />
        <link rel="canonical" href={`${window.location.origin}/login`} />
      </Helmet>
      <AppLayout>
        <section className="max-w-md mx-auto card-elevated p-6">
          <h1 className="text-2xl font-semibold mb-4">Log in</h1>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Log in"}</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            No account? <Link to="/signup" className="underline">Sign up</Link>
          </p>
        </section>
      </AppLayout>
    </>
  );
}
