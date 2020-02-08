import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const defaultLocale = 'jp';
export const isDefaultLocale = locale => locale === defaultLocale;
const LocaleLink = ({ to, children }) => {
  const {
    i18n: { language: locale }
  } = useTranslation();

  return (
    <Link component={GatsbyLink} to={`${isDefaultLocale(locale) ? '' : `/${locale}`}${to}`}>
      {children}
    </Link>
  );
};
export default LocaleLink;
