import React from 'react';

/**
 * RolexSubmarinerViewer — Pure Sketchfab 3D embed.
 * Fullscreen black background with the interactive 3D Rolex model.
 * Uses Sketchfab's embed API params for autostart and dark theme.
 */
export default function RolexSubmarinerViewer() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxHeight: '85vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <iframe
        title="Rolex-blue 3D Model"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/ca779010d3384174a713184ff0cb2ae6/embed?autospin=0.2&autostart=1&preload=1&ui_theme=dark&dnt=1"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  );
}
