import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AiDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/ai/sign-in");
  }

  const savedOutputs = await prisma.savedOutput.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <div className="main-container py-12">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          AI Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "28px",
            lineHeight: 1.8,
          }}
        >
          Your saved AI outputs will appear here.
        </p>

        {savedOutputs.length === 0 ? (
          <div className="ai-side-card">
            <div className="ai-side-link">
              No saved outputs yet. Generate a result and click “Save Output”.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {savedOutputs.map((item) => (
              <div key={item.id} className="ai-side-card">
                <h2 className="ai-side-title" style={{ marginBottom: "10px" }}>
                  {item.toolSlug}
                </h2>

                <div className="ai-side-list">
                  <div className="ai-side-link">
                    <strong>Input:</strong>
                    <br />
                    {item.input}
                  </div>

                  <div className="ai-side-link">
                    <strong>Output:</strong>
                    <br />
                    <div style={{ whiteSpace: "pre-wrap" }}>{item.output}</div>
                  </div>

                  <div className="ai-side-link">
                    <strong>Saved:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
