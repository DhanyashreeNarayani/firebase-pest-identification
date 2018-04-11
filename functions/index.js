
const functions = require('firebase-functions');
var admin =require("firebase-admin");

admin.initializeApp(functions.config().firebase);

var firestore =admin.firestore();

exports.webhook =functions.https.onRequest((request, response)=>{
    console.log("request.body.result.parameters:",request.body.result.parameters);

    let params=request.body.result.parameters;

    params=params.replace(/\s/g,'');

    params=params.toLowerCase();
    if(params=="unknowndisease")
      var speech=`Sorry I can't Identify this pest for now :( `;
    else if(params=="randomimages")      
      var speech =`I can't identify the picture you send. Kindly only send images of pest or affected leaf`;
    else{
       firestore.collection('pest').doc(params).get()
           .then((querySnapShot)=> {
           //var measures=doc.measure;
           //var name =doc.name;

            var speech =`Your crops are affected by ${doc.name}\nHere is the control measure\n${doc.measure}`;
          
           })
            }   
           response.send({
             speech:speech
           })    
    });
