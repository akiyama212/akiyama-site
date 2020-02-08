import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { Grid, AppBar, Toolbar, Button, Box, Popover } from '@material-ui/core';
import { Translate as TranslateIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

import LocaleLink, { isDefaultLocale } from '../LocaleLink';
import Logo from '../Logo';

const languageNames = {
  jp: '日本語',
  en: 'English'
};

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary
  },
  header: {
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    margin: '0 auto',
    padding: theme.spacing(1)
  },
  menu: {
    height: '100%',
    marginTop: 0
  }
}));

const Header = ({ siteTitle }) => {
  const { t, i18n } = useTranslation();

  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = useState(false);
  const handleOpenLanguagePopover = () => setIsLanguagePopoverOpen(true);
  const handleCloseLanguagePopover = () => setIsLanguagePopoverOpen(false);

  const buttonRef = useRef();

  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" elevation={6} className={classes.bar}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" className={classes.header}>
            <Box flex="1 1 auto">
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <LocaleLink to="/">
                    <Logo alt={siteTitle} />
                  </LocaleLink>
                </Grid>
                <Grid item>
                  <Grid container spacing={2} alignItems="flex-end" className={classes.menu}>
                    <Grid item>
                      <LocaleLink to="/solutions">{t('Solutions')}</LocaleLink>
                    </Grid>
                    <Grid item>
                      <LocaleLink to="/about">{t('About')}</LocaleLink>
                    </Grid>
                    <Grid item>
                      <LocaleLink to="/news">{t('News')}</LocaleLink>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Button buttonRef={buttonRef} onClick={handleOpenLanguagePopover}>
              <TranslateIcon />
              {languageNames[i18n.language]}
            </Button>
            <Popover
              anchorEl={buttonRef.current}
              open={isLanguagePopoverOpen}
              onClose={handleCloseLanguagePopover}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Grid container direction="column">
                {['jp', 'en'].map(lang => (
                  <Button
                    key={lang}
                    onClick={() => {
                      const path = isDefaultLocale(lang) ? '/' : `/${lang}/`;
                      navigate(path);
                      handleCloseLanguagePopover();
                    }}
                  >
                    {languageNames[lang]}
                  </Button>
                ))}
              </Grid>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
