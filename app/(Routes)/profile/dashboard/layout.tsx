export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>داشبورد</title>
      {children}
    </div>
  );
}
