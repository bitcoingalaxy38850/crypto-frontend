import React, { useEffect } from 'react';
import { waveform } from 'ldrs'; // Import waveform from ldrs

waveform.register(); // Register the waveform loader

const LoadingIcon = () => {
  useEffect(() => {
    // Ensure the loader is registered and ready to be displayed
    waveform.register();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <l-waveform
        size="50" // Adjust size as needed
        stroke="4" // Adjust stroke width
        speed="1" // Animation speed
        color="white" // Customize color
      ></l-waveform>
    </div>
  );
};

export default LoadingIcon;
