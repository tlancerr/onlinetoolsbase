import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function Page() {
  return (
    <ToolLayout
      title="PDF Page Numbering"
      description="Add page numbers to every page of a PDF file."
      category="PDF Tools"
      slug="pdf-page-numbering"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
