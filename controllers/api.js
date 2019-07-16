/**
 * POST /api/data-example
 * return stylesheet
 */
exports.postDataExample = (req, res) => {
  res.render('api/data-example', {
    say: req.body.say,
    again: req.body.again,
  });
};
