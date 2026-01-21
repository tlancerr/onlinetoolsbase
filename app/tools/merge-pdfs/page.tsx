import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function Page() {
  return (
    <ToolLayout
      title="Merge PDF"
      description="Merge multiple PDF files into one document."
      category="PDF Tools"
      slug="merge-pdfs"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
