//Requiring express  and initializing the constant "app"const express = require('express')
const https = require('https')
const express = require("express");
const port = process.env.PORT || 3000;
const app = express()

//recognize the incoming Request Object as strings or arrays from HTML
app.use(express.urlencoded({extended: true}));

//The public folder which holds the CSS and images
app.use(express.static("public"))
//route to the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})



//As soon as the sign-up button is pressed execute this

app.post("/", (req, res) => {

//Getting html values you pass from the web

    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    //Creating an object with the users data
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }


//Convert javascript code to json string

    const jsonData = JSON.stringify(data);
//Api url

    const url = config.url;
    const options ={
        method: "POST",
        auth:config.apikey
    }
//Uploading the data to the server

    const  request = https.request(url, options, function (response) {
        //check if the web working
        if(response.statusCode === 200){

            res.sendFile(__dirname + "/success.html");

        }else {
            //If all goes well show failure page
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function (data){
          console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

//Failure page added option to redirect to main page

app.post('/faliure', (req, res) => {
    res.redirect("/");
})

/* מאפשר לעבוד עם HEROKU ומערכות אחרות - (port) */
/*   בנוסף מאפשר לנו לעבוד בצורת LOCALHOST */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


