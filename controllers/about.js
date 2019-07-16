/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('about', {
    title: 'About',
  });
};
