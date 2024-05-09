export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>آزمون‌های روانشناختی</title>

      <div>{children}</div>
    </div>
  );
}
