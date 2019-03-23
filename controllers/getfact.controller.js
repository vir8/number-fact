
var LOADER_IO="loaderio-2ba00ce9ba6fdad15e1d2d814430fd9c";

var request = require("request")

exports.find = (function (req, res) {
    var num = req.body.queryResult.parameters.number
        ? req.body.queryResult.parameters.number :
        420;
    var url = "http://numbersapi.com/" + num;
    var utype = ["math", "trivia"];
    var type = "";
    var count = 0;
    var simpleResponse = req.body.queryResult.fulfillmentMessages[0] ? req.body.queryResult.fulfillmentMessages[0] :
        {
            "platform": "ACTIONS_ON_GOOGLE",
            "simpleResponses": {
                "simpleResponses": [
                    {
                        "textToSpeech": ""//blank
                    }
                ]
            }
        };
    var prefix=["Fact for ","Tell me about ","","Now for ","How about ",""];//6ix
    var suggestions = {
        "platform": "ACTIONS_ON_GOOGLE",
        "suggestions": {
            "suggestions": [
                {
                    "title": prefix[Math.floor(Math.random() * 6)] + Math.floor(Math.random() * 101)
                },
                {
                    "title": prefix[Math.floor(Math.random() * 6)] + Math.floor(Math.random() * 101)
                },
                {
                    "title": prefix[Math.floor(Math.random() * 6)] + Math.floor(Math.random() * 101)
                },
                {
                    "title": "Stop"
                }
            ]
        }
    }

    var random = Math.random();
    random = Math.floor(random * 100) + 1;//[1,100]
    if (random % 4) {
        type = utype[0];//--25% trivia fact--
    }
    else {
        type = utype[0];//75% math fact
    }
    //console.log(random);



    console.log(type + " for " + num);
    //console.log(url);

    request({
        url: url + "/" + type,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {


        //console.log(response);
        if (!body.found) {
            if (count == 0) {
                count = 1;
                type = utype[(random + 1) % 2];

            }
            speech = "Seems like I don't know any fact about this number.Let's try another.";
            let r = {

                
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [
                            {
                                "textToSpeech": speech
                            }
                        ]
                    }
                }, suggestions]//,
                //"source": ""

            };

            return res.json(r);

        }
        else {
            var fact = body.text;
            let r = {

                "fulfillmentText": fact,
                "fulfillmentMessages": [{
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [
                            {
                                "textToSpeech": fact
                            }
                        ]
                    }
                },simpleResponse, suggestions],
                "source": ""

            };
            return res.json(r);
        }

    })

});

exports.loader = (function (req, res) {
    var file = __dirname + '/assets/'+"loaderio-2ba00ce9ba6fdad15e1d2d814430fd9c"+".txt";
    res.download(file);
});