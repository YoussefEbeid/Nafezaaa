export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-nafeza-500">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" /> {/* Optional texture */}
      <div className="w-full max-w-md p-4 relative z-10">
        {children}
      </div>
    </div>
  );
}