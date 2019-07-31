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
            
        const speechText = 'Welcome to FIFA 2019 PLAYER.<break time = "1s" /> Display the player\'s profile. Please select players by narrowing down from your country of origin or team name. Select Nation, Club 1, Club 2 or Club 3 by tapping the screen or by vocie.<break time = "2s" /> ';
        const reprompt2 = 'On the menu, from the nation, club 1, club 2, club 3, please tap the screen or select by voice.<break time = "2s" />';
        const speechText2 = 'Welcome to FIFA 2019 PLAYER. You need a screen device to use this skill. It can not be used with your device.<break time = "2s" /> ';

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

        const speechText = 'Reset. In the menu, tap the screen or select the nation, club 1, club 2 or club 3 by voice.<break time = "2s" /> ';
        const reprompt2 = 'In the menu, tap the screen or select the nation, club 1, club 2 or club 3 by voice.<break time = "2s" />';
            
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
            let speechText = `Tapped Club 1.<break time = "1s" />Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
            
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
            let speechText = `Tapped club 2.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
            
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
            let speechText = `Tapped club 3.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
            
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
            let speechText = `Tapped ${choice1}.<break time ="1s"/> Tap a nation or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a nation or say number.<break time ="2s"/>'  
            
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
        
            attributes.nationclub = choice1  //nation
            attributes.times = 5;
            
        let speechText = `Tapped ${choice1}.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
            
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
        
            attributes.data4 = data4;
            attributes.times = 3;
            
        let speechText = `Tapped ${choice1}.<break time ="1s"/> Tap a player or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a player or say number.<break time ="2s"/>'   
        
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
          
            attributes.clubnation = choice1  //club
            attributes.times = 2;            
            
        let speechText = `Tapped ${choice1}.<break time ="1s"/> Tap a nation or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a nation or say number.<break time ="2s"/>'   
        
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
        
            attributes.data4 = data4;
            attributes.times = 3;   
            
        let speechText = `Tapped ${choice1}.<break time ="1s"/> Tap a player or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a player or say number.<break time ="2s"/>'   
        
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
        
        let speechText = `Tapped ${choice1}.<break time ="3s"/> Say reset to start again.<break time ="2s"/>` 
        const reprompt2 = 'Say reset to start again.<break time ="2s"/>'   
        
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
            let speechText = `Selected Club 1 by voice.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
        
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
            let speechText = `Selected Club 2 by voice.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
        
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
            let speechText = `Selected Club 3 by voice.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'  
        
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
            let speechText = `Selected nation by voice.<break time ="1s"/> Tap a nation or say number.<break time ="2s"/>`  
            const reprompt2 = 'Tap a nation or say number.<break time ="2s"/>'  
            
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

       const speechTextIf = 'Tap a nation or say number again.<break time ="2s"/>'  
        
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
   
        let speechText = `Select ${choice1e} by voice.<break time ="1s"/> Tap a club or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a club or say number.<break time ="2s"/>'     
        
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
            
        const speechTextIf = 'Tap a club or say number again.<break time ="2s"/>'  
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

        let speechText = `Selected ${choice1f} by voice.<break time ="1s"/>Tap a player or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a player or say number.<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'Tap a club or say number again.<break time ="2s"/>'  
        
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
            
        let speechText = `Selected ${choice1b} by voice.<break time ="1s"/>Tap a nation or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a nation or say number.<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'Tap a nation or say number again.<break time ="2s"/>'  
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
            
        let speechText = `Selected ${choice1c} by voice.<break time ="1s"/>Tap a player or say number.<break time ="2s"/>`  
        const reprompt2 = 'Tap a player or say number.<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'Tap a player or say number again.<break time ="2s"/>'  
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

        let speechText = `Selected ${choice1d} by voice.<break time ="3s"/>Say reset to start again.<break time ="2s"/>` 
        const reprompt2 = '<break time ="3s"/>Say reset to start again.<break time ="2s"/>' 
        
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
        const speechText = 'Welcome to FIFA 2019 player data. This skill displays the profile of FIFA players. \
        You can search your favorite player by touching the screen. It is also possible to advance the filtering by voice instead of touch. \
        If you narrow down by country of origin and team, you will see a list of player names. Select a player name and the player\'s profile \
        will be displayed. First, in the menu, from Nation, Club 1, Club 2, Club 3. Please tap the screen or select by voice.<break time ="2s"/>'
        const reprompt2 = 'To go to the menu screen, say Reset or Menu. Please tap the screen or select by voice.<break time ="2s"/>' 
        
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

