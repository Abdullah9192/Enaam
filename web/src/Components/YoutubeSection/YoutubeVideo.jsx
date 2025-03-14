import React, { useEffect, useRef } from "react";

const YoutubeVideo = () => {
  const mainVideoRef = useRef(null);
  const sideVideosRef = useRef(null);
  const sideVideoRefs = useRef([]);

  const adjustContainerHeights = () => {
    if (mainVideoRef.current && sideVideosRef.current) {
      const mainVideoHeight = mainVideoRef.current.offsetHeight;
      sideVideosRef.current.style.height = `${mainVideoHeight}px`;

      // Reserve space for text and adjust iframe height
      const reservedTextHeight = 50; // Approximate height for text
      const sideVideoHeight = mainVideoHeight / sideVideoRefs.current.length;

      sideVideoRefs.current.forEach((video) => {
        if (video) {
          video.style.height = `${sideVideoHeight}px`;
          const iframe = video.querySelector("iframe");
          const youtubeDate = video.querySelector(".youtube-date");

          if (iframe) {
            iframe.style.height = `${sideVideoHeight - reservedTextHeight}px`; // Adjust iframe height
            iframe.style.width = "100%";
          }

          if (youtubeDate) {
            youtubeDate.style.height = `${reservedTextHeight}px`;
            youtubeDate.style.overflow = "hidden"; // Prevent overflow
          }
        }
      });
    }
  };

  useEffect(() => {
    adjustContainerHeights(); // Set initial heights
    window.addEventListener("resize", adjustContainerHeights); // Adjust on resize

    return () => {
      window.removeEventListener("resize", adjustContainerHeights); // Cleanup
    };
  }, []);

  return (
    <div className="video-container p-md-5 p-3">
      <div className="main-video" ref={mainVideoRef}>
        <iframe
          src="https://www.youtube.com/embed/ukhT2KLRsYw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="side-videos px-3" ref={sideVideosRef}>
        {[1, 2].map((_, index) => (
          <div
            className="side-video"
            key={index}
            ref={(el) => (sideVideoRefs.current[index] = el)}
          >
            <iframe
              src="https://www.youtube.com/embed/_x_WFdi4EmA?si=uBBHHUfj9mW2IgY2"
              title={`Side video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <div className="youtube-date">
              <span>Monday, 14 October</span>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeVideo;
