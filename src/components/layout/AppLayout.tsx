import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
