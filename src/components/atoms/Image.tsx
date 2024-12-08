/* eslint-disable @typescript-eslint/no-explicit-any */

interface IImageProps {
  src?: any;
  alt?: string;
  priority?: boolean;
  className?: string;
  [key: string]: any;
  unoptimized?: boolean;
  width?: string | number;
  height?: string | number;
  loading?: "lazy" | "eager";
}

export default function Image({
  props,
  alt = "",
  src = "",
  width = "",
  height = "",
  className = "",
  loading = "lazy",
  priority,
  unoptimized = false,
}: IImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={className}
      loading={loading}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
