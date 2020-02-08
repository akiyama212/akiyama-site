import React from 'react';
import { graphql } from 'gatsby';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withI18next from '../components/withI18next';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import LocaleLink from '../components/LocaleLink';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  }
}));

const SolutionsPage = ({ data, t }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.posts.edges;
  const { heading, subheading } = data.page.frontmatter;

  const classes = useStyles();

  return (
    <Layout>
      <SEO title={siteTitle} />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="caption">{t('hello')}</Typography>
          <Typography variant="h1">{heading}</Typography>
          <Typography variant="subtitle1">{subheading}</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title;
              return (
                <Grid item key={node.fields.slug}>
                  <Paper component="article" elevation={5} className={classes.paper}>
                    <header>
                      <Typography variant="h4">
                        <LocaleLink to={node.fields.slug}>{title}</LocaleLink>
                      </Typography>
                      <Typography variant="caption">{node.frontmatter.date}</Typography>
                    </header>
                    <section>
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt
                        }}
                      />
                    </section>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default withI18next({ ns: 'common' })(SolutionsPage);

export const pageQuery = graphql`
  query solutionsByLocale($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "post" }, locale: { eq: $locale } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    page: markdownRemark(
      frontmatter: { templateKey: { eq: "solutions-page" }, locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        heading
        subheading
      }
    }
  }
`;
