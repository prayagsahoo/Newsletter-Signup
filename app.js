const express = require("express");
const https = require("https");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(requ,res){
     const firstName = requ.body.fName;
     const lastName = requ.body.lName;
     const email = requ.body.email;

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
     };

     const jsonData = JSON.stringify(data);
     const url = "https://us14.api.mailchimp.com/3.0/lists/fc0a79b285";

     const options = {
        method: "POST",
        auth: "prayag1:6234fcc7b47366f40587b566ff5bf796-us14"
     }

     const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     })

     request.write(jsonData)
     request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});


//audience id: fc0a79b285

//api key: d848a784cd750f9db4ecd6e98b05e7ff-us14
