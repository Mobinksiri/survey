import { useSearchParams } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
