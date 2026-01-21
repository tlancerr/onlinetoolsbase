import ToolLayout from "@/components/ToolLayout";
import ToolLoader from "./ToolLoader";

export default function Page() {
  return (
    <ToolLayout
      title="Extract Images from PDF"
      description="Extract all images from a PDF file instantly."
      category="PDF Tools"
      slug="pdf-extract-images"
    >
      <ToolLoader />
    </ToolLayout>
  );
}
