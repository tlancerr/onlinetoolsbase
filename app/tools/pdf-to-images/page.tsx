import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function PdfToImagesPage() {
  return (
    <ToolLayout
      title="PDF to Images"
      description="Convert PDF pages into high-quality images."
      category="PDF Tools"
      slug="pdf-to-images"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
