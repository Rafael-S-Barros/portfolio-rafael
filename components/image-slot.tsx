import Image from "next/image";

type ImageSlotProps = {
  /** Path under `public/`. When absent the slot renders its placeholder. */
  src?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Decorative art — rendered with an empty alt and hidden from the a11y tree. */
  decorative?: boolean;
};

/**
 * Fills its (positioned) parent with an image, or with a labelled placeholder
 * while the asset is still missing.
 */
export function ImageSlot({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  decorative = false,
}: ImageSlotProps) {
  if (!src) {
    return (
      <div className="rb-slot-empty" role="img" aria-label={alt}>
        <span aria-hidden="true">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      fill
      sizes={sizes}
      priority={priority}
      className="rb-slot-img"
    />
  );
}
