const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./html-routes.js');

// All routes defined in the api directory with `/api` and all html routes are /
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;