import React from 'react';
import './Banner.scss';
// import { Image } from '@/components/ui/Image/Image';
import { IBanner } from '@/types/ui';

export const Banner: React.FC<IBanner> = ({ img }) => {
  return (
    <div className="banner-container">
      <img src={img} alt="Banner Flormorado Café" />
    </div>
    // <section className="banner-first">
    //     <Image src={img} alt="Banner Flormorado Café" />
    // </section>
  );
};
