/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header';
import './normalize.css';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper
  },
  main: {
    margin: `0 auto`,
    maxWidth: theme.breakpoints.values.md,
    padding: `0px 1.0875rem 1.45rem`,
    paddingTop: 100
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className={classes.root}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Grid container className={classes.main} direction="column">
            <main>{children}</main>
            <footer style={{ paddingTop: 10 }}>Dreamly © {new Date().getFullYear()}</footer>
          </Grid>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
