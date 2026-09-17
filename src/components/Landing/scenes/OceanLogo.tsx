import React from 'react';

export interface OceanLogoProps {
  className?: string;
  showSubtext?: boolean;
  glow?: boolean;
  alt?: string;
}

/**
 * Official OCEAN Logo Component
 * Displays the official OCEAN branding wordmark:
 * "OCEAN - The carbon intelligence platform"
 * with soft atmospheric cinematic bloom illumination.
 */
export const OfficialOceanLogo: React.FC<OceanLogoProps> = ({
  className = "w-full h-auto",
  glow = true,
  alt = "OCEAN - The carbon intelligence platform",
}) => {
  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Soft atmospheric cinematic bloom behind the wordmark */}
      {glow && (
        <div 
          className="absolute inset-0 -inset-x-16 -inset-y-12 bg-radial from-[#45DFEC]/25 via-[#237E94]/12 to-transparent blur-3xl pointer-events-none rounded-full"
          aria-hidden="true"
        />
      )}

      <img
        src="/ocean_logo.png"
        alt={alt}
        className={`relative z-10 w-full h-auto select-none object-contain drop-shadow-[0_0_35px_rgba(69,223,236,0.25)] ${className}`}
        loading="eager"
        draggable={false}
      />
    </div>
  );
};

