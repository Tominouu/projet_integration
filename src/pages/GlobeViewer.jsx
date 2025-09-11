import { useEffect } from "react";

export default function GlobeViewer() {
  useEffect(() => {
    // Panolens et THREE sont dispo globalement (window.PANOLENS)
    const panorama = new window.PANOLENS.ImagePanorama("/src/pages/test.jpeg");

    const viewer = new window.PANOLENS.Viewer({
      container: document.querySelector("#panorama-container"),
      autoHideInfospot: false,
    });

    viewer.add(panorama);

    const infospot = new window.PANOLENS.Infospot(350, window.PANOLENS.DataImage.Info);
    infospot.position.set(5000, 0, 0);
    infospot.addHoverText("Tour Eiffel");
    panorama.add(infospot);

    return () => viewer.dispose();
  }, []);

  return <div id="panorama-container" className="w-full h-screen" />;
}
