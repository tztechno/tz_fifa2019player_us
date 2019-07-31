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
            
        const speechText = 'FIFA 2019 PLAYERへようこそ。<break time ="1s"/>選手のプロフィールを表示します。出身国あるいは所属チーム名から絞り込んで選手を選んで下さい。\
        初めに、メニューで、ネイション、クラブ１、クラブ２、クラブ３から、画面をタップするか音声で選択して下さい。<break time ="2s"/>';
        const reprompt2 = 'メニューで、ネイション、クラブ１、クラブ２、クラブ３から、画面をタップするか音声で選択して下さい。<break time ="2s"/>'
        const speechText2 = 'FIFA 2019 PLAYERへようこそ。このスキルを使用するには画面付きデバイスが必要です。今お使いのデバイスでは使用出来ません。<break time ="2s"/>';

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
            
        const speechText = 'リセットしました。メニューで、ネイション、クラブ１、クラブ２、クラブ３から、画面をタップするか音声で選択して下さい。<break time ="2s"/>';
        const reprompt2 = 'メニューで、ネイション、クラブ１、クラブ２、クラブ３から、画面をタップするか音声で選択して下さい。<break time ="2s"/>'        
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
            let speechText = `クラブ１をタップしました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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
            let speechText = `クラブ２をタップしました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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
            let speechText = `クラブ３をタップしました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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
            let speechText = `${choice1}をタップしました。<break time ="1s"/>国名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = '国名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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
            
        let speechText = `${choice1}をタップしました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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
            
        let speechText = `${choice1}をタップしました。<break time ="1s"/>選手名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '選手名をタップするか番号を言ってください。<break time ="2s"/>'   
        
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
            
        let speechText = `${choice1}をタップしました。<break time ="1s"/>国名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '国名をタップするか番号を言ってください。<break time ="2s"/>'   
        
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
            
        let speechText = `${choice1}をタップしました。<break time ="1s"/>選手名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '選手名をタップするか番号を言ってください。<break time ="2s"/>'   
        
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
        
        let speechText = `${choice1}をタップしました。<break time ="3s"/>もう一度始めるにはリセットと言って下さい。<break time ="2s"/>` 
        const reprompt2 = '<break time ="3s"/>もう一度始めるにはリセットと言って下さい。<break time ="2s"/>'   
        
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
            let speechText = `クラブ１を音声選択しました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            let speechText = `クラブ２を音声選択しました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            let speechText = `クラブ３を音声選択しました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            let speechText = `ネイションを音声選択しました。<break time ="1s"/>国名をタップするか番号を言ってください。<break time ="2s"/>`  
            const reprompt2 = '国名をタップするか番号を言ってください。<break time ="2s"/>'  
            
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

       const speechTextIf = 'もう一度、国名をタップするか番号を言ってください。<break time ="2s"/>'  
        
            if( Num < 1 || Num > 164){
      
        return handlerInput.responseBuilder
            .withShouldEndSession(false)                       
            .speak(speechTextIf)
            .reprompt(speechTextIf)   
            .getResponse()           
           
        } else{
       
        let choice1e = apl_data_nation.nation_data.text[Num-1];                  
        let nationclubs = apl_data_nationclub.nationclub_data.text.filter(dat => dat[0] === choice1e);
        let clubs = getCol(nationclubs, 1);
   
        let speechText = `${choice1e}を音声選択しました。<break time ="1s"/>クラブ名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = 'クラブ名をタップするか番号を言ってください。<break time ="2s"/>'     
        
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
            
        const speechTextIf = 'もう一度、クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
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

        let speechText = `${choice1f}を音声選択しました。<break time ="1s"/>選手名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '選手名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'もう一度、クラブ名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            
        let speechText = `${choice1b}を音声選択しました。<break time ="1s"/>国名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '国名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'もう一度、国名をタップするか番号を言ってください。<break time ="2s"/>'  
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
            
        let speechText = `${choice1c}を音声選択しました。<break time ="1s"/>選手名をタップするか番号を言ってください。<break time ="2s"/>`  
        const reprompt2 = '選手名をタップするか番号を言ってください。<break time ="2s"/>'  
        
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
            
       const speechTextIf = 'もう一度、選手名をタップするか番号を言ってください。<break time ="2s"/>'  
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

        let speechText = `${choice1d}を音声選択しました。<break time ="3s"/>もう一度始めるにはリセットと言って下さい。<break time ="2s"/>` 
        const reprompt2 = '<break time ="3s"/>もう一度始めるにはリセットと言って下さい。<break time ="2s"/>' 
        
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
        const speechText = 'FIFA2019選手データへようこそ。FIFA登録選手のプロフィールを表示するスキルです。メニュー画面から画面タッチで絞り込みを進めます。\
        タッチの代わりに音声で絞り込みを進めることも可能です。出身国、所属チームで絞り込むと選手名のリストが表示されます。\
        選手名を選択すると、選手のプロフィールが表示されます。まず、メニューで、ネイション、クラブ１、クラブ２、クラブ３から、\
        画面をタップするか音声で選択して下さい。<break time ="2s"/>';
        const reprompt2 = 'メニュー画面に移動するには、リセットあるいはメニューと言って下さい。メニューで、ネイション、クラブ１、クラブ２、クラブ３から、\
        画面をタップするか音声で選択して下さい。<break time ="2s"/>' 
        
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
        const speechText = 'ストップしました。';
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
        const speechText = "うまく聞き取れませんでした。";

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

