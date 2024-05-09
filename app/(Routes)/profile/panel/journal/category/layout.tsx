export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>مدیریت دسته بندی (مجله)</title>
      {children}
    </div>
  );
}
