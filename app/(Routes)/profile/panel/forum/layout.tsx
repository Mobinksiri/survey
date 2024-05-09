export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>مدیریت تالار گفت‌و‌گو</title>
      {children}
    </div>
  );
}
