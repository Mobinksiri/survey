export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <title>مدیریت دسته بندی (تالار گفت و گو)</title>
      {children}
    </div>
  );
}
