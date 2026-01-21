import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function Page() {
  return (
    <ToolLayout
      title="PDF ↔ Word Converter"
      description="Convert PDF to Word or Word to PDF instantly."
      category="PDF Tools"
      slug="pdf-word-converter"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
