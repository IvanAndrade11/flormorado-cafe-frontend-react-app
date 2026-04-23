import React from "react";
import "./Banner.scss";

import { isMobile } from "react-device-detect";

import { IBanner } from "@/types/ui";
import { videos } from "@/utils/constants";

export const Banner: React.FC<IBanner> = ({ img }) => {
  return (
    <>
      {isMobile ? (
        <div className="banner-video-container">
          <video
            className="banner-video"
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            disablePictureInPicture
            preload="metadata"
            poster={img}
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={videos.Bird} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>
      ) : (
        <div className="banner-container">
          <img src={img} alt="Flormorado Café" />
        </div>
      )}
    </>
  );
};
