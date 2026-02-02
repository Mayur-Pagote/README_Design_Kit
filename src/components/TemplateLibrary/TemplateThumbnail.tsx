import type { Template } from "@/types/templates";
import soon from "../soon.svg";
import Thumbnail from "../Thumbnail";

interface TemplateThumbnailProps {
  template: Template;
  className?: string;
}

export function TemplateThumbnail({
  template,
  className = "",
}: TemplateThumbnailProps) {
  const iconPath = template.thumbnail || soon;

  return (
    <div
      className={`relative overflow-hidden border rounded-t-lg bg-white aspect-video ${className}`}
    >
      <Thumbnail imageUrl={iconPath} />
    </div>
  );
}
