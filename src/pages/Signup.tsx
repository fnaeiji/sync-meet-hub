import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error });
    } else {
      toast({ title: "Check your email", description: "We sent you a confirmation link." });
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up | SyncMeet</title>
        <meta name="description" content="Create your SyncMeet account to start managing meetings." />
        <link rel="canonical" href={`${window.location.origin}/signup`} />
      </Helmet>
      <AppLayout>
        <section className="max-w-md mx-auto card-elevated p-6">
          <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="underline">Log in</Link>
          </p>
        </section>
      </AppLayout>
    </>
  );
}
