//クラブ、国、名前、プロフィール

const Alexa = require('ask-sdk-core');
const cardTitle = "FIFA 2019 PLAYER";
const fifa_data = require('./fifa_data.js');
const apl_data_club = require('./apl_data_club.json');
const apl_data_top = require('./apl_data_top.json');
const apl_data_nation = require('./apl_data_nation.json');
const apl_data_nationclub = require('./apl_data_nationclub.json');
const data = fifa_data.DATA;
const data2 = data.concat(); 
let times = 0;

const Util = require('util.js');

function getCol(matrix, col){
    var column =[];
    for (var i=0; i<matrix.length; i++){
        column.push(matrix[i][col]);
    }
    return  column;
}

function unique(array){
    return array.reduce(function(uniq, arr){
        var nonuniq_element = uniq.find(function(target){
            return target === arr;
        });
        if(!nonuniq_element){
            uniq.push(arr);
        }
        return uniq;
    }, []);
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {

        let attributes = handlerInput.attributesManager.getSessionAttributes();         
            attributes.times = 0;
            attributes.data3 = [];
            
        const speechText = 'Welcome to FIFA 2019 PLAYER. <break time = "1s" /> Let\'s display your favorite player\'s profile. \
                            Please select a player by chossing the nation or the team. \
                            First, select Nation, Club 1, Club 2 or Club 3 by tapping or by vocie.';
        const reprompt2 = 'Select Nation, Club 1, Club 2 or Club 3 by tapping or by vocie. ';
        const speechText2 = 'Welcome to FIFA 2019 PLAYER. Sorry. This skill is available with a display_attached device.';

        if (Util.isAPLSupported(handlerInput.requestEnvelope)) {
        return handlerInput.responseBuilder
        
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",
                document: require('./apl_doc_top.json'),
                datasources: require('./apl_data_top.json')
                }) 
            .withShouldEndSession(false)                   
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse();
            
        } else {
        
        return handlerInput.responseBuilder
                .speak(speechText2)
                .getResponse();
        }            
            
    }
}


const ResetIntentHandler = {
    canHandle(handlerInput) {
        return  handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'ResetIntent';
    },
    handle(handlerInput) {
    
        let attributes = handlerInput.attributesManager.getSessionAttributes();         
            attributes.times = 0;
            attributes.data3 = [];    

        const speechText = 'Reset done. Please select Nation, Club 1, Club 2 or Club 3 by tapping or by vocie.';
        const reprompt2 = 'Please select Nation, Club 1, Club 2 or Club 3 by tapping or by vocie.';
            
        return handlerInput.responseBuilder
        
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",
                document: require('./apl_doc_top.json'),
                datasources: require('./apl_data_top.json')
                }) 
            .withShouldEndSession(false)                   
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse();
    }
};


const TouchEventHandler = {
    canHandle(handlerInput) {
    return ((handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent' &&
        (handlerInput.requestEnvelope.request.source.handler === 'Press' || 
        handlerInput.requestEnvelope.request.source.handler === 'onPress')));
    },
    handle(handlerInput) {

         let attributes = handlerInput.attributesManager.getSessionAttributes();  
            let data3 = attributes.data3;
            let times = attributes.times;  

        let choice1 = handlerInput.requestEnvelope.request.arguments[0];     

        if (choice1 === "Club1 (1,a-e)") {
            
            attributes.times = 1;              
            let speechText = `Club 1 tapped.<break time = "1s" /> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
            
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club1.json'),
                    datasources: require('./apl_data_club1.json')
                    })  
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse()              
  　}  

        if (choice1 === "Club2 (f-o)") {
            
            attributes.times = 1;              
            let speechText = `Club 2 tapped.<break time ="1s"/> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
            
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club2.json'),
                    datasources: require('./apl_data_club2.json')
                    })  
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse()              
  　}  
  　
        if (choice1 === "Club3 (p-z)") {
            
            attributes.times = 1;              
            let speechText = `Club 3 tapped.<break time ="1s"/> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
            
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club3.json'),
                    datasources: require('./apl_data_club3.json')
                    })  
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse()              
  　}  

        if (choice1 === "Nation") {
            
            attributes.times = 4;              
            let speechText = `${choice1} tapped.<break time ="1s"/> Please tap a nation or say number.`  
            const reprompt2 = 'Please tap a nation or say number.'  
            
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_nation.json'),
                    datasources: require('./apl_data_nation.json')
                    })   
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
  　}  

        if (times === 4) {
          
        let nationclubs = apl_data_nationclub.nationclub_data.text.filter(dat => dat[0] === choice1);
        let clubs = getCol(nationclubs, 1);
        
            attributes.nationclubs = nationclubs        
            attributes.nationclub = choice1  //nation
            attributes.times = 5;
            
        let speechText = `${choice1} tapped.<break time ="1s"/> Please tap a club or say number.`  
        const reprompt2 = 'Please tap a club or say number.'  
            
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
            {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",
                                                "fontSize": "30dp"
                                            },  
                                      {
                                            "type": "Text",
                                                "text": choice1,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                                   
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": clubs, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                    
                                ]}
                            },
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse()              
    }
    
        if (times === 5) {
  
        let nationclub = attributes.nationclub;              
        let data3 = data2.filter(dat => dat[6] === choice1);  // club                  
        let data4 = data3.filter(dat => dat[3] === nationclub);  // nation      
        let names = getCol(data4, 0);  //クラブ・国絞り込みの選手リスト
        
            attributes.names = names;
            attributes.data4 = data4;
            attributes.times = 3;
            
        let speechText = `${choice1} tapped.<break time ="1s"/> Please tap a player or say number.`  
        const reprompt2 = 'Please tap a player or say number.'   
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
            {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": nationclub+" > "+choice1,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": names, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
    }

        if (times === 1) {
            
        let clubnations = apl_data_nationclub.nationclub_data.text.filter(dat => dat[1] === choice1);
        let nations = getCol(clubnations, 0);
          
            attributes.clubnations = clubnations 
            attributes.clubnation = choice1  //club
            attributes.times = 2;            
            
        let speechText = `${choice1} tapped.<break time ="1s"/> Please tap a nation or say number.`  
        const reprompt2 = 'Please tap a nation or say number.'   
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
                {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": choice1,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": nations, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
    }
 
        if (times === 2) {
   
        let clubnation = attributes.clubnation;              
        let data3 = data2.filter(dat => dat[6] === clubnation);  // club                  
        let data4 = data3.filter(dat => dat[3] === choice1);  // nation      
        let names = getCol(data4, 0);  //クラブ・国絞り込みの選手リスト

            attributes.names = names;        
            attributes.data4 = data4;
            attributes.times = 3;   
            
        let speechText = `${choice1} tapped.<break time ="1s"/> Please tap a player or say number.`  
        const reprompt2 = 'Please tap a player or say number.'   
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
             {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": clubnation+" > "+choice1,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": names, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2) 
            .getResponse()              
    }
 
        if (times === 3) {
            
        let data4 = attributes.data4;
        let data5 = data4.filter(dat => dat[0] === choice1);  // name   
        
        let speechText = `${choice1} tapped.<break time ="3s"/> Please say reset to start again.` 
        const reprompt2 = 'Please say reset to start again.'   
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",
                    document:
                         {
                            "type": "APL",
                            "version": "1.0",
                            "theme": "dark",
                            "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                            "mainTemplate": {
                                "items": [
                            
                                     {
                                    "type": "Container",
                                    "direction" : "column",
                                    "height": "100vh",
                                    "width": "100vw",
                                    "position" : "absolute",
                                    "items":[
                                                
                                {
                                    "type": "Container",
                                    "height": "100vh",
                                    "width": "100vw",            
                                    "paddingLeft":"0vw",            
                                    "items":[
                                             {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            },
                                             {
                                            "type": "Text",
                                                "text": data5[0][0],
                                                "paddingTop":"5vh",                
                                                "textAlign": "center",
                                                "fontSize": "25dp"
                                            },             
                                            {
                                            "type": "Frame",
                                                "when": "${viewport.shape == 'round'}",                    
                                                "width": "100vw",            
                                                "paddingLeft":"40vw",    
                                                "item": {
                                                "type": "Image",
                                                "height":"20vh",
                                                "source": data5[0][2]
                                            }
                                            }, 
                                            {
                                            "type": "Frame",
                                                "when": "${viewport.shape != 'round'}",                    
                                                "width": "100vw",            
                                                "paddingLeft":"45vw",    
                                                "item": {
                                                "type": "Image",
                                                "height":"20vh",
                                                "source": data5[0][2]
                                            }
                                            },                     
                                            {
                                            "type": "Text",
                                            "paddingTop":"5vh",                     
                                            "text": data5[0][6],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                   
                                            {
                                            "type": "Text",
                                            "text": "("+data5[0][3]+")",
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },
                                             {
                                            "type": "Text",
                                            "paddingTop":"5vh",                      
                                            "text": "Age: " + data5[0][1],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                    
                                             {
                                            "type": "Text",
                                            "text": "Potential: " + data5[0][5],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },
                                             {
                                            "type": "Text",
                                            "text": "Value: "+ data5[0][8],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                   
                
             ]
         },
         
        ]
        }
    ]
    }
    
},
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
                    
    }     　
    }
}            


const SelectNumberIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'SelectNumberIntent';
    },        
    handle(handlerInput) {
         let Num = handlerInput.requestEnvelope.request.intent.slots.num.value;
         
         let attributes = handlerInput.attributesManager.getSessionAttributes();  
            let data3 = attributes.data3;
            let times = attributes.times;  
        
        if (handlerInput.requestEnvelope.request.intent.slots.club_one.value) {

            attributes.times = 1;              
            let speechText = `Club 1 selected by voice.<break time ="1s"/> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
        
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club1.json'),
                    datasources: require('./apl_data_club1.json')
                    })   
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)   
            .getResponse()              

  　}  
  　　　　
        if (handlerInput.requestEnvelope.request.intent.slots.club_two.value) {

            attributes.times = 1;              
            let speechText = `Club 2 selected by voice.<break time ="1s"/> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
        
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club2.json'),
                    datasources: require('./apl_data_club2.json')
                    })   
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)   
            .getResponse()              
  　}  

        if (handlerInput.requestEnvelope.request.intent.slots.club_three.value) {

            attributes.times = 1;              
            let speechText = `Club 3 selected by voice.<break time ="1s"/> Please tap a club or say number.`  
            const reprompt2 = 'Please tap a club or say number.'  
        
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_club3.json'),
                    datasources: require('./apl_data_club3.json')
                    })   
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)   
            .getResponse()              
  　}  

        if (handlerInput.requestEnvelope.request.intent.slots.nation.value) {

            attributes.times = 4;              
            let speechText = `Nation selected by voice.<break time ="1s"/> Please tap a nation or say number.`  
            const reprompt2 = 'Please tap a nation or say number.'  
            
            return handlerInput.responseBuilder
        
            .addDirective ({
                    type : 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.0',
                    token: "token",
                    document: require('./apl_doc_nation.json'),
                    datasources: require('./apl_data_nation.json')
                    })  
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
  　} 
  　　　　
        if (times === 4) {

       const speechTextIf = 'Please tap a nation or say number again.'  
        
            if( Num < 1 || Num > 164) {
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{
       
        let choice1e = apl_data_nation.nation_data.text[Num-1];                  
        let nationclubs = apl_data_nationclub.nationclub_data.text.filter(dat => dat[0] === choice1e);
        let clubs = getCol(nationclubs, 1);
   
        let speechText = `${choice1e} selected by voice.<break time ="1s"/> Please tap a club or say number.`  
        const reprompt2 = 'Please tap a club or say number.'     
        
            attributes.nationclubs = nationclubs  //nation
            attributes.nationclub = choice1e  //nation
            attributes.times = 5;       
            
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
            {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": choice1e,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": clubs, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)   
            .getResponse()              
            
        }   
    } 　　

        if (times === 5) {
            
        const speechTextIf = 'Please tap a club or say number again.'  
        let nationclubs = attributes.nationclubs; 
        
            if( Num < 1 || Num > nationclubs.length ){
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{           
            
        let nationclub = attributes.nationclub;
        let choice1f = nationclubs[Num-1][1]; 
        
        let data3 = data2.filter(dat => dat[6] === choice1f);  // club                  
        let data4 = data3.filter(dat => dat[3] === nationclub);  // nation      
        let names = getCol(data4, 0);  //クラブ・国絞り込みの選手リスト
        
            attributes.data4 = data4;
            attributes.times = 3;
            attributes.names = names;            

        let speechText = `${choice1f} selected by voice.<break time ="1s"/>Please tap a player or say number.`  
        const reprompt2 = 'Please tap a player or say number.'  
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
             {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": nationclub+" > "+choice1f,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": names, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)   
            .getResponse()              
    }
    }

        if (times === 1) {
            
       const speechTextIf = 'Please tap a club or say number again.'  
        
            if( Num < 1 || Num > 651 ){
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{            
            
        let choice1b = apl_data_club.club_data.text[Num-1];                 
        let clubnations = apl_data_nationclub.nationclub_data.text.filter(dat => dat[1] === choice1b);
        let nations = getCol(clubnations, 0);
        
            attributes.clubnations = clubnations  //nation
            attributes.clubnation = choice1b  //nation
            attributes.times = 2;   
            
        let speechText = `${choice1b} selected by voice.<break time ="1s"/>Please tap a nation or say number.`  
        const reprompt2 = 'Please tap a nation or say number.'  
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
            {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                        {
                                            "type": "Text",
                                                "text": choice1b,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                             
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": nations, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)  
            .getResponse()              
    }
        }
        
        if (times === 2) {
            
       const speechTextIf = 'Please tap a nation or say number again.'  
       let clubnations = attributes.clubnations;    
       
            if( Num < 1 || Num > clubnations.length ){
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{            
       
        let clubnation = attributes.clubnation;
        let choice1c = clubnations[Num-1][0]; 
        
        let data3 = data2.filter(dat => dat[6] === clubnation);  // club                  
        let data4 = data3.filter(dat => dat[3] === choice1c);  // nation      
        let names = getCol(data4, 0);  //クラブ・国絞り込みの選手リスト
        
            attributes.data4 = data4;
            attributes.times = 3;
            attributes.names = names;

            data3 = attributes.data3;
            
        let speechText = `${choice1c} selected by voice.<break time ="1s"/> Please tap a player or say number.`  
        const reprompt2 = 'Please tap a player or say number.'  
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",

                document: {
                        "type": "APL",
                        "version": "1.0",
                        "theme": "dark",
                        "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                        "mainTemplate": {
                            "parameters": [
                                "payload"
                            ],
                            "items": [
             {
                                "type": "Container",
                                "alignItems": "center",
                                "justifyContent": "center",
                                "height": "100vh",
                                "items": [
                                      {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            }, 
                                      {
                                            "type": "Text",
                                                "text": clubnation+" > "+choice1c,
                                                "textAlign": "center",
                                                "color": "blue",
                                                "fontSize": "40dp"
                                            },                                               
                                    {
                                        "type": "Sequence",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "numbered": true,
                                        "grow":1,
                                        "shrink":1,                                          
                                        "scrollDirection": "vertical",
                                        "data": names, 
                                        "item": {
                                            "type": "TouchWrapper",
                                            "onPress": {
                                                "type": "SendEvent",
                                                "arguments": [
                                                    "${data}",
                                                    "${ordinal}"]
                                            },
                                            "item": [{
                                                "type": "Text",
                                                "text": "(${ordinal}) ${data}",
                                                "textAlign": "center",
                                                "textAlignVertical": "center",
                                                "fontWeight": "700"
                                            }
                                            ]
                                        }
                                    }
                                    ]}
                                ]}
                            },
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .reprompt(reprompt2)         
            .getResponse()              
            }
        }
 
        if (times === 3) {
            
       const speechTextIf = 'Please tap a player or say number again.'  
       let names = attributes.names;        
        
            if( Num < 1 || Num > names.length ){
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{            
            
        let data4 = attributes.data4;
        let choice1d = data4[Num-1][0];          
        let data5 = data4.filter(dat => dat[0] === choice1d);  // name   

        let speechText = `${choice1d} selected by voice.<break time ="3s"/> Please say reset to start again.` 
        const reprompt2 = 'Please say reset to start again.' 
        
        return handlerInput.responseBuilder
            .addDirective ({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                token: "token",
                    document:
                         {
                            "type": "APL",
                            "version": "1.0",
                            "theme": "dark",
                            "import": [
                            {
                                "name": "alexa-layouts",
                                "version": "1.0.0"
                            }
                            ],
                            "mainTemplate": {
                                "items": [
                                     {
                                    "type": "Container",
                                    "direction" : "column",
                                    "height": "100vh",
                                    "width": "100vw",
                                    "position" : "absolute",
                                    "items":[
                                                
                                {
                                    "type": "Container",
                                    "height": "100vh",
                                    "width": "100vw",            
                                    "paddingLeft":"0vw",            
                                    "items":[
                                             {
                                            "type": "Text",
                                                "text": "FIFA 2019 PLAYER",
                                                "paddingTop":"10vh",  
                                                "textAlign": "center",
                                                "color": "red",                                                
                                                "fontSize": "30dp"
                                            },
                                             {
                                            "type": "Text",
                                                "text": data5[0][0],
                                                "paddingTop":"5vh",                
                                                "textAlign": "center",
                                                "fontSize": "25dp"
                                            },             
                                            {
                                            "type": "Frame",
                                                "when": "${viewport.shape == 'round'}",                    
                                                "width": "100vw",            
                                                "paddingLeft":"40vw",    
                                                "item": {
                                                "type": "Image",
                                                "height":"20vh",
                                                "source": data5[0][2]
                                            }
                                            }, 
                                            {
                                            "type": "Frame",
                                                "when": "${viewport.shape != 'round'}",                    
                                                "width": "100vw",            
                                                "paddingLeft":"45vw",    
                                                "item": {
                                                "type": "Image",
                                                "height":"20vh",
                                                "source": data5[0][2]
                                            }
                                            },                     
                                            {
                                            "type": "Text",
                                            "paddingTop":"5vh",                     
                                            "text": data5[0][6],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                   
                                            {
                                            "type": "Text",
                                            "text": "("+data5[0][3]+")",
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },
                                             {
                                            "type": "Text",
                                            "paddingTop":"5vh",                      
                                            "text": "Age: " + data5[0][1],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                    
                                             {
                                            "type": "Text",
                                            "text": "Potential: " + data5[0][5],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },
                                             {
                                            "type": "Text",
                                            "text": "Value: "+ data5[0][8],
                                            "textAlign": "center",
                                            "fontSize": "20dp"
                                            },                   
                                    ]
                            },
                    ]
                }
            ]
        }
},
               
                    }) 
            .withShouldEndSession(false)                       
            .speak(speechText)
            .getResponse()              
                    
    }     　
    }
    }
}    


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to FIFA 2019 player. This skill shows the profile of your favorite FIFA player. \
                            Please slect a nation and a team. Then, select a player.  The player\'s profile will be displayed. \
                            First, please tap the screen or select Nation, Club 1, Club 2 or Club 3 by voice.'
        const reprompt2 = 'To go back to the start menu, please say Reset or Menu. Please tap the screen or select by voice.' 
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt2)              
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Stopped.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)            
            .getResponse();
    }
};


const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};


const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = "did not hear well.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ResetIntentHandler, 
　　　　SelectNumberIntentHandler,
        TouchEventHandler, 
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();

