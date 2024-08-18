// components/MapImage.tsx
import React from 'react';
import Image from 'next/image';

async function MapImage() {
  return (
    <div className="p-5  w-full h-44 md:h-96 lg:h-128 relative">
      <Image
        src="/images/TempMap.jpg" // Ensure this path is correct
        alt="Map"
        fill
        priority
        style={{objectFit: "cover"}}
        className="px-5 sm:px-16 md:px-48 lg:px-56 rounded-lg my-5 sm:my-8 "
      />
    </div>
  );
}

export default MapImage;
