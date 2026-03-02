import React from "react";
import "./Banner.scss";

import { isMobile } from "react-device-detect";

import { IBanner } from "@/types/ui";
import { videos } from "@/utils/constants/videos";

export const Banner: React.FC<IBanner> = ({ img }) => {
  return (
    <>
      <div className="banner-container">
        {isMobile ? (
          <video className="banner-video" controls autoPlay muted loop>
            <source src={videos.Bird} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        ) : (
          <img src={img} alt="Banner Flormorado Café" />
        )}
      </div>
    </>
  );
};
