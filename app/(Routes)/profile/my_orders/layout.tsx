export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>سفارش های من</title>
      {children}
    </div>
  );
}
