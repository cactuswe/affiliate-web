import '../globals.css';
import ClientProviders from '../../components/ClientProviders';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
