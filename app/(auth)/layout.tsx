export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="wrapper flex justify-center min-h-screen">{children}</main>
  );
}
