//jshint esversion: 6
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
        apiKey:  '324d1c4c91263bb6fbcdd07f110f48d3-us17',
        server: 'us17',
});

const event = {
        name: 'Newsletter Subscription', 
};

const footerContactInfo = {
        company: "Everbliss7 Inc.",
        address1: "13 Connor Street",
        address2: "",
        city: "Port Shepstone",
        state: "KZN",
        zip: "4240",
        country: "South Africa",
};

const campaignDefaults = {
        from_name: "Blessing Tayedzerwa",
        from_email: "app.buid.dev@gmail.com",
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