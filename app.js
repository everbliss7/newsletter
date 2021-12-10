//jshint esversion: 6
require('dotenv').config();
const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(express.urlencoded({'extended': true}));
app.use(express.static('public'));

mailchimp.setConfig({
        apiKey:  process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER,
});

//Add a subscriber to the Newsletter Mailing List
async function addSubscriber(subscriber) {
        // const listId = process.env.MAILCHIMP_LIST_ID;
        const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
                email_address: subscriber.email,
                status: 'subscribed',
                merge_fields: {
                        FNAME: subscriber.firstName,
                        LNAME: subscriber.lastName,
                },
        });
        return response;
}

app.get('/', (req, res) => {
        res.sendFile(__dirname + '/signup.html');
})
app.post('/', (req, res) => {
        try{  
                //add the subscriber to the mailing list
                const subscribingUser = {
                        //get the email and name from the form
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        email: req.body.email,
                };
                if(res.statusCode === 200){
                        const result = addSubscriber(subscribingUser);
                        console.log(
                                `Successfully added contact as an audience member. The contact's id is ${
                                  result.id
                                }.`
                        );
                        res.sendFile(__dirname + '/success.html');
                }else{
                        res.sendFile(__dirname + '/failure.html');
                }
        }catch(error){
                console.log('Error');
                console.log(error);
                res.sendFile(__dirname + '/failure.html');
        }
})
app.get('/failure', (req, res) => {
        res.sendFile(__dirname + '/failure.html');
})
app.get('/success', (req, res) => {
        res.sendFile(__dirname + '/success.html');
})

app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000');
})