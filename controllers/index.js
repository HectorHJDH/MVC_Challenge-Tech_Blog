const router = require("express").Router();
const dashBoardRoutes = require("./dashBoardRoutes");
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

// Mount the homeRoutes on the root URL ("/")
router.use("/", homeRoutes);

// Mount the apiRoutes on the "/api" URL prefix
router.use("/api", apiRoutes);

// Mount the dashBoardRoutes on the "/dashboard" URL prefix
router.use("/dashboard", dashBoardRoutes);

// If none of the defined routes match, return a 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
