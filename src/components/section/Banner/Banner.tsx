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
          <video className="banner-video" autoPlay muted loop>
            <source src={videos.Bird} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>
      ) : (
        <div className="banner-container">
          <img src={img} alt="Banner Flormorado Café" />
        </div>
      )}
    </>
  );
};
