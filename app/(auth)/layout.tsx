export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="wrapper flex min-h-screen flex-col py-6">{children}</main>
  );
}
