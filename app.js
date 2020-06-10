const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));  //to use static files and images
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (
    req,
    res
) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
            },
        ],
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "http://us8.api.mailchimp.com/3.0/lists/7d4853afd1",
        method: "POST",
        headers: {
            Authorization: 'username 772ef0ae2421bc703d302cd4bd40e735-us8',
        },
        body: jsonData,
        //followRedirect: false
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });
    console.log(firstName + lastName + email);
});


app.listen(3000, function () {
    console.log("server is running on port 3000");
});

//api key
//822f2dfbac6fc3a45c7eace18bb0b217-us8   772ef0ae2421bc703d302cd4bd40e735-us8

//list id
//7d4853afd1  7d4853afd1



