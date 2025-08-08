import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";

const SEO = ({ title, description, path }: { title: string; description: string; path: string }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${window.location.origin}${path}`} />
  </Helmet>
);

export default SEO;
