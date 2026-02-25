import './WhatsAppButton.scss';

import { icons } from '@/utils/constants';

export const WhatsAppButton = () => {
  return (
    <a href="https://wa.me/573132316080" target="_blank">
      <img src={icons.WhatsApp} className={`sticky-button sticky`} alt="WhatsApp Flormorado Café" />
    </a>
  );
};
