import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `StaticQuery`: https://gatsby.dev/staticquery
 */

const Logo = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxHeight: 50, quality: 100) {
              presentationWidth
              presentationHeight
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      const {
        placeholderImage: {
          childImageSharp: { fluid }
        }
      } = data;
      const { presentationWidth, presentationHeight } = fluid;
      return <Img fluid={fluid} style={{ width: presentationWidth, height: presentationHeight }} />;
    }}
  />
);
export default Logo;
