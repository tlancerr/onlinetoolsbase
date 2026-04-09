type ToolHeaderProps = {
  title: string;
  description: string;
};

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="ai-section-card" style={{ marginTop: "0px" }}>
      
      <div className="ai-section-body">

        <h1
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: "1.2",
            marginBottom: "12px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            maxWidth: "720px",
            fontSize: "1rem",
            lineHeight: "1.8",
            color: "var(--ai-text-soft)",
          }}
        >
          {description}
        </p>

      </div>
    </div>
  );
}
