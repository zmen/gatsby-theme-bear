import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const DateTransform = ({ date }) => {
  const { t } = useTranslation();

  const now = Date.now();
  const target = new Date(date);
  if (target.toString() === 'Invalid Date') {
    return <span>Invalid Date</span>;
  }
  const days = Math.floor((now - target.getTime()) / 1000 / 3600 / 24);
  if (days <= 7) return <span>{days}{t('days')}</span>
  if (days <= 30) return <span>{Math.floor(days / 7)}{t('weeks')}</span>
  if (days <= 365) return <span>{Math.floor(days / 30)}{t('months')}</span>
  return <span>{Math.floor(days / 365)}{t('years')}</span>
};

export default DateTransform;
