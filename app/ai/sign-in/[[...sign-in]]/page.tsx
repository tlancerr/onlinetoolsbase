import { SignIn } from "@clerk/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const params = await searchParams;
  const redirectUrl = params.redirect_url || "/ai";

  return (
    <div className="main-container py-12">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignIn fallbackRedirectUrl={redirectUrl} />
      </div>
    </div>
  );
}
