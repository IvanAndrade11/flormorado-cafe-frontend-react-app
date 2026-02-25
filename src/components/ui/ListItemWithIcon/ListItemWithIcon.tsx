import React from 'react';
import './ListItemWithIcon.scss';

import { IListItemWithIcon } from '@/types/ui';

export const ListItemWithIcon = ({ icon, text, className = '', onClick }: IListItemWithIcon) => {
  return (
    <li
      onClick={onClick}
      className={`${className} item`}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <img src={icon} />
      <span>{text}</span>
    </li>
  );
};
