import React, { useEffect } from "react";
import * as PANOLENS from "panolens";

export default function GlobeViewer() {
  useEffect(() => {
    const panorama = new PANOLENS.ImagePanorama("/test.jpg"); 
    // 👆 mets ton image 360° (format équirectangulaire)

    const viewer = new PANOLENS.Viewer({
      container: document.querySelector("#panorama-container"),
      autoHideInfospot: false,
    });

    viewer.add(panorama);

    // Exemple hotspot
    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot.position.set(5000, 0, 0); // coordonnée sur la sphère
    infospot.addHoverText("Tour Eiffel");
    infospot.addEventListener("click", () => {
      alert("Ceci est la Tour Eiffel !");
    });

    panorama.add(infospot);

    return () => viewer.dispose();
  }, []);

  return (
    <div
      id="panorama-container"
      className="w-full h-screen"
    />
  );
}
