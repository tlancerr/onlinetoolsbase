import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function Page() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Split a PDF into separate pages or page ranges."
      category="PDF Tools"
      slug="split-pdf"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
