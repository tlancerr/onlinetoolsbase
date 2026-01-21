import ToolLayout from "@/components/ToolLayout";
import ImageBlurLoader from "./ImageBlurLoader";

export default function Page() {
  return (
    <ToolLayout
      title="Image Blur Tool"
      description="Blur image backgrounds, faces, or selected areas instantly."
      category="Image Tools"
    >
      <ImageBlurLoader />
    </ToolLayout>
  );
}
