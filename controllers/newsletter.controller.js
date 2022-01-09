const mailchimp = require('../services/mailchimp');

module.exports = {
    async add_to_newsletter(req, res) {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        const result = await mailchimp.subscribeToNewsletter(email);

        if (result.status === 400) {
            return res.status(400).json({ error: result.title });
        }

        res.status(200).json({
            success: true,
            message: 'You have successfully subscribed to the newsletter'
        });
    }
}