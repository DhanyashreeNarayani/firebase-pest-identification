
const functions = require('firebase-functions');
var admin =require("firebase-admin");

admin.initializeApp(functions.config().firebase);

var firestore =admin.firestore();

exports.webhook =functions.https.onRequest((request, response)=>{
    console.log("request.body.result.parameters:",request.body.result.parameters);

    let params=request.body.result.parameters;
    params=params.pestname;
    params=params.replace(/\s/g,'');
    console.log("Helllo"+params);
    params=params.toLowerCase();
    if(params=="unknowndisease")
      var speech=`Sorry I can't Identify this pest for now :( `;
    else if(params=="randomimages")      
      var speech =`I can't identify the picture you send. Make sure you only send images of pest or affected leaf`;
    else{
      if(request.body.result.action=="justthepestname.justthepestname"||request.body.result.action=="knowthepestname")
      {

       
       firestore.collection('pest').doc(params).get()
           .then(function(doc) {
           //var measures=doc.measure;
           //var name =doc.name;
           var docum=doc.data();
          console.log(docum);
          var speech =`Here is the control measure\n${docum.measure}`;
             response.send({
              speech:speech
            }) ;   
           })
           .catch((err) => {
            console.log('Error getting documents', err);
           });
           
            } 
          else if(request.body.result.action=="justthepestname");
           {
            firestore.collection('pest').doc(params).get()
            .then(function(doc){
            //var measures=doc.measure;
            //var name =doc.name;
            var docum=doc.data();
            console.log(docum);
            var speech =`The pest is ${docum.name} Do you want me to show you the control measures??`;
            response.send({
              speech:speech
            }) ;  
           })

           .catch((err) => {
            console.log('Error getting documents', err);
           });
           
            
           }

          
    }});
