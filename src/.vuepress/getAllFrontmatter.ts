// .vuepress/getAllFrontmatter.js
module.exports = {
  name: 'get-all-frontmatter',
  extendsPage: (page, app) => {
    console.log({ page, app });
    console.log(page.data.frontmatter);
    app.siteData.frontmatter = app.siteData.frontmatter ?? [];
    app.siteData.frontmatter.push(page.data.frontmatter);
  }
};
