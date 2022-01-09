const newsletterController = require("../controllers/newsletter.controller");
const router = require("express").Router();

router.post("/addToNewsletter", newsletterController.add_to_newsletter);

module.exports = router