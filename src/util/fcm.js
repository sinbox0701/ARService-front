import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage  } from "firebase/messaging"

const firebaseConfig = {
    apiKey: "AIzaSyBoxfRMi2O53Xi3eDO3-FJZUFmYKTMn-l4",
    authDomain: "push-ars.firebaseapp.com",
    projectId: "push-ars",
    storageBucket: "push-ars.appspot.com",
    messagingSenderId: "187925005810",
    appId: "1:187925005810:web:9bad2ba2abafb3e9f8d76b",
    measurementId: "G-1S2P0BBS74"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

getToken(messaging,{
    vapidKey:"BNImNfacoJPlRHDtP122ejtjPMLlYD9OYZMOvLrbdfESKk3TY0NNSSTXVLHKdqeoufCvZxcn9ZCXk0qeztkGnAU"
}).then((currentToken)=>{
    if(currentToken){
        console.log(app);
        console.log(currentToken);
    }else{
        console.log("No Regiester Token")
    }
}).catch((err)=>{
    console.log("An error occured while retrieving token. ",err);
});

onMessage(messaging, (payload)=>{
    console.log("Message received",payload);
    alert(`${payload.notification.title} ${payload.notification.body}`)
});