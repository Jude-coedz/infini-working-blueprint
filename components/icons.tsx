import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 16, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => <Base {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Base>;
export const ArrowLeft = (props: IconProps) => <Base {...props}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></Base>;
export const Check = (props: IconProps) => <Base {...props}><path d="m5 12 4 4L19 6"/></Base>;
export const Alert = (props: IconProps) => <Base {...props}><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.74 3h15.12a2 2 0 0 0 1.74-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/></Base>;
export const Spark = (props: IconProps) => <Base {...props}><path d="m12 3-1.2 4.1a5.3 5.3 0 0 1-3.7 3.7L3 12l4.1 1.2a5.3 5.3 0 0 1 3.7 3.7L12 21l1.2-4.1a5.3 5.3 0 0 1 3.7-3.7L21 12l-4.1-1.2a5.3 5.3 0 0 1-3.7-3.7L12 3Z"/></Base>;
export const Play = (props: IconProps) => <Base {...props}><path d="m8 5 11 7-11 7V5Z"/></Base>;
export const Rotate = (props: IconProps) => <Base {...props}><path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5"/></Base>;
export const Layers = (props: IconProps) => <Base {...props}><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></Base>;
export const Braces = (props: IconProps) => <Base {...props}><path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/></Base>;
export const Eye = (props: IconProps) => <Base {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></Base>;
export const Shield = (props: IconProps) => <Base {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></Base>;
export const Database = (props: IconProps) => <Base {...props}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></Base>;
export const Close = (props: IconProps) => <Base {...props}><path d="M6 6l12 12M18 6 6 18"/></Base>;
