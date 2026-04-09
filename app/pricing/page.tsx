export default function PricingPage() {
  return (
    <div className="main-container py-12">
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Pricing
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "32px",
            lineHeight: 1.8,
          }}
        >
          Start free and upgrade when you need more usage and premium AI features.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="ai-side-card">
            <h2 className="ai-side-title">Free</h2>
            <p style={{ marginBottom: "14px" }}>For testing and occasional use</p>
            <div className="ai-side-list">
              <div className="ai-side-link">5 runs per day</div>
              <div className="ai-side-link">Basic access</div>
              <div className="ai-side-link">No saved history</div>
            </div>
          </div>

          <div className="ai-side-card">
            <h2 className="ai-side-title">Pro</h2>
            <p style={{ marginBottom: "14px" }}>For creators and SEO professionals</p>
            <div className="ai-side-list">
              <div className="ai-side-link">Higher daily usage</div>
              <div className="ai-side-link">Priority access</div>
              <div className="ai-side-link">Saved outputs</div>
            </div>
          </div>

          <div className="ai-side-card">
            <h2 className="ai-side-title">Agency</h2>
            <p style={{ marginBottom: "14px" }}>For teams and client work</p>
            <div className="ai-side-list">
              <div className="ai-side-link">Bulk usage</div>
              <div className="ai-side-link">Multi-tool workflows</div>
              <div className="ai-side-link">Future team features</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
