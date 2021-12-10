//jshint esversion: 6
const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config();

mailchimp.setConfig({
        apiKey:  process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER,
});

const event = {
        name: 'Newsletter Subscription', 
};

const footerContactInfo = {
        company: "Everbliss7 Inc.",
        address1: "Street",
        address2: "",
        city: "City",
        state: "KZN",
        zip: "",
        country: "South Africa",
};

const campaignDefaults = {
        from_name: process.env.FROM_NAME,
        from_email: process.env.FROM_EMAIL,
        subject: "Welcome to Everbliss7",
        language: "EN_US",
};

// Create a new mailing list
async function run() {
        const response = await mailchimp.lists.createList({
                name: event.name,
                contact: footerContactInfo,
                permission_reminder: "You are receiving this email because you signed up for updates about Blesssing Tayedzerwa.",
                email_type_option: true,
                campaign_defaults: campaignDefaults,
        });

        console.log(
                `Successfully created an audience. The audience id is ${response.id}.`
        );
}

run();