import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: OptimizedImageProps) {
  const isLargeLogo =
    src.includes("logo-white") || src.includes("/logo.webp") || src.includes("/images/logo");

  if (isLargeLogo) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width || 192}
        height={height || 48}
        className={className}
        priority={priority}
        quality={85}
        sizes="(max-width: 768px) 140px, 192px"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
