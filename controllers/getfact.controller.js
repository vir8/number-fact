

var request = require("request")

exports.find = (function (req, res) {
    var num = req.body.queryResult.parameters.number
        ? req.body.queryResult.parameters.number :
        420;
    var url = "http://numbersapi.com/" + num;
    var utype = ["math", "trivia"];
    var type = "";
    var count = 0;

    var random = Math.random();
    random = Math.floor(random * 100) + 1;//[1,100]
    if (random % 4) {
        type = utype[0];//--25% trivia fact--
    }
    else {
        type = utype[0];//75% math fact
    }
    //console.log(random);

    
    
    console.log(type+" for "+num);
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
            if(count==0)
            {
                count=1;
                type=utype[(random+1)%2];
                
            }
            speech = "Seems like I don't know any fact about this number.Let's try another.";
            let r = {

                "fulfillmentText": speech,
                "fulfillmentMessages": [{ "text": { "text": [speech] } }],
                "source": ""

            };
            return res.json(r);

        }
        else {
            var fact = body.text;
            let r = {

                "fulfillmentText": fact,
                "fulfillmentMessages": [{ "text": { "text": [fact] } }],
                "source": ""

            };
            return res.json(r);
        }
       
    }) 

});
