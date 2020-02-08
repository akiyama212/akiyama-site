import React from 'react';
import { renderToString } from 'react-dom/server';
import { graphql } from 'gatsby';
import { Typography, Grid, Link, List, ListItem } from '@material-ui/core';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Blockquote from '../components/Blockquote';

import withI18next from '../components/withI18next';

const PostTemplate = props => {
  const {
    location,
    data: {
      markdownRemark: {
        html,
        frontmatter: { title, description, date, excerpt }
      },
      site: {
        siteMetadata: { title: siteTitle }
      }
    }
  } = props;

  //Add material-ui classes
  const formattedHtml = html
    .replace(/<h1>(([\s\S](?!<h1>))*)<\/h1>/g, (match, text) =>
      renderToString(<Typography variant="h3" dangerouslySetInnerHTML={{ __html: text }} />)
    )
    .replace(/<h2>(([\s\S](?!<h2>))*)<\/h2>/g, (match, text) =>
      renderToString(<Typography variant="h4" dangerouslySetInnerHTML={{ __html: text }} />)
    )
    .replace(/<a href="(.*)">(.*)<\/a>/g, (match, href, text) =>
      renderToString(<Link href={href} dangerouslySetInnerHTML={{ __html: text }} />)
    )
    .replace(/<blockquote>(([\s\S](?!<blockquote>))*)<\/blockquote>/g, (match, text) =>
      renderToString(<Blockquote dangerouslySetInnerHTML={{ __html: text }} />)
    )
    .replace(/<p>(([\s\S](?!<p>))*)<\/p>/g, (match, text) =>
      renderToString(<Typography variant="body1" dangerouslySetInnerHTML={{ __html: text }} />)
    )
    .replace(/<li>(([\s\S](?!<li>))*)<\/li>/g, (match, text) =>
      renderToString(
        <li>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: text }} />
        </li>
      )
    );

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || excerpt} />
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Grid>
        <Grid item>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: formattedHtml }} />
        </Grid>
      </Grid>
    </Layout>
  );
};
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
export default withI18next({ ns: 'common' })(PostTemplate);
