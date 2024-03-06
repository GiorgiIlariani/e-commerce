export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="wrapper flex h-screen flex-col">{children}</main>;
}
