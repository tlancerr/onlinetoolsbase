export default function AiPricingPage() {
  return (
    <div className="main-container py-12">
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          AI Tools Pricing
        </h1>

        <p
          style={{
            color: "#64748b",
            lineHeight: 1.8,
            marginBottom: "28px",
          }}
        >
          Start free and upgrade when you need more daily generations, better workflows, and premium AI features.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="ai-side-card">
            <h2 className="ai-side-title">Guest</h2>
            <div className="ai-side-list">
              <div className="ai-side-link">2 free runs per day</div>
              <div className="ai-side-link">No saved history</div>
              <div className="ai-side-link">Login required after limit</div>
            </div>
          </div>

          <div className="ai-side-card">
            <h2 className="ai-side-title">Free Account</h2>
            <div className="ai-side-list">
              <div className="ai-side-link">5 free runs per day</div>
              <div className="ai-side-link">Future saved history</div>
              <div className="ai-side-link">Good for trial use</div>
            </div>
          </div>

          <div className="ai-side-card">
            <h2 className="ai-side-title">Pro</h2>
            <div className="ai-side-list">
              <div className="ai-side-link">Higher daily limits</div>
              <div className="ai-side-link">Priority access</div>
              <div className="ai-side-link">Premium AI workflow features</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
