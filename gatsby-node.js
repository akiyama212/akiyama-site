const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require('fs');
const localesNSContent = {
  en: [
    {
      content: fs.readFileSync(`src/locales/en/common.json`, 'utf8'),
      ns: 'common'
    }
  ],
  jp: [
    {
      content: fs.readFileSync(`src/locales/jp/common.json`, 'utf8'),
      ns: 'common'
    }
  ]
};

const availableLocales = [{ value: 'jp', text: '日本語' }, { value: 'en', text: 'English' }];
const defaultLocales = { value: 'jp', text: '日本語' };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/post.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "post" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                locale
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    const {
      node: {
        fields: { slug },
        frontmatter: { locale }
      }
    } = post;

    console.log(post);

    const isDefaultLocale = locale === defaultLocales.value;

    createPage({
      path: `${isDefaultLocale ? '' : `/${locale}`}${slug}`,
      component: blogPost,
      context: {
        slug: slug,
        previous,
        next,
        availableLocales,
        locale,
        localeData: localesNSContent[locale]
      }
    });
  });
};

exports.onCreatePage = async props => {
  const {
    page,
    actions: { createPage, deletePage, createRedirect }
  } = props;

  if (/^\/dev-404-page\/?$/.test(page.path)) {
    return;
  }

  deletePage(page);

  availableLocales.map(({ value }) => {
    let newPath = `/${value}${page.path}`;
    if (defaultLocales.value === value) {
      newPath = page.path;
    }

    const localePage = {
      ...page,
      originalPath: page.path,
      path: newPath,
      context: {
        availableLocales,
        locale: value,
        routed: true,
        localeData: localesNSContent[value],
        originalPath: page.path
      }
    };
    createPage(localePage);
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
