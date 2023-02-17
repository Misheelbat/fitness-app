Live Website: https://fitbody-app.netlify.app/

To start the project in local environment, 
You should always configure and use the following tools:

1. clone the repo
2. you need to create a firebase account and create a new project.
3. after you have created a new project you will be given a firebase config
   it looks like this: 
   
   const firebaseConfig = {
     apiKey: "",
     
     authDomain: "",
     
     projectId: "",
     
     storageBucket: "",
     
     messagingSenderId: "",
     
     appId: ""
   };
4. create a .env file in the project root and create the following Environment variables 
   using the firebase config values.

REACT_APP_FIREBASE_API_KEY= 

REACT_APP_FIREBASE_AUTH_DOMAIN= 

REACT_APP_FIREBASE_PROJECT_ID= 

REACT_APP_FIREBASE_STORAGE_BUCKET= 

REACT_APP_FIREBASE_MESSAGING_SENDER_ID= 

REACT_APP_FIREBASE_APP_ID=

