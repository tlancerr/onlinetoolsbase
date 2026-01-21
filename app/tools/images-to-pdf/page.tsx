import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function ImagesToPdfPage() {
  return (
    <ToolLayout
      title="Images to PDF"
      description="Convert multiple images into a single PDF file instantly."
      category="PDF Tools"
      slug="images-to-pdf"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
