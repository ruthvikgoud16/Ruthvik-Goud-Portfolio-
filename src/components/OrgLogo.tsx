interface OrgLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OrgLogo({ src, alt, className = '' }: OrgLogoProps) {
  const wide =
    src.includes('anurag') ||
    src.includes('oneplus.svg') ||
    src.includes('gdg.svg') ||
    src.includes('aic-raise') ||
    src.includes('react-hyderabad') ||
    src.includes('stackflow.png');
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ${className}`}>
      <img
        src={src}
        alt={alt}
        className={wide ? 'h-7 w-auto max-w-[7.5rem] object-contain px-1.5 py-1' : 'h-8 w-8 object-contain p-1'}
      />
    </span>
  );
}
