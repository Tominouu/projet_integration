import { useEffect, useRef } from "react";

export default function GlobeViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.PANOLENS || !window.THREE) {
      console.error("PANOLENS ou THREE non trouvé !");
      return;
    }

    console.log("PANOLENS dispo ?", window.PANOLENS);
    console.log("THREE dispo ?", window.THREE);

    const panorama = new window.PANOLENS.ImagePanorama("/globe1.jpg");

    const viewer = new window.PANOLENS.Viewer({
      container: containerRef.current,
      autoHideInfospot: false,
    });

    viewer.add(panorama);

    const infospot = new window.PANOLENS.Infospot(
      350,
      window.PANOLENS.DataImage.Info
    );
    infospot.position.set(5000, 0, 0);
    infospot.addHoverText("Tour Eiffel");
    panorama.add(infospot);

    return () => {
      viewer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
