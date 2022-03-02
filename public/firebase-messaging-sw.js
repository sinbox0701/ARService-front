importScripts("https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js");

const config = {
  apiKey: "AIzaSyBoxfRMi2O53Xi3eDO3-FJZUFmYKTMn-l4",
  authDomain: "push-ars.firebaseapp.com",
  projectId: "push-ars",
  storageBucket: "push-ars.appspot.com",
  messagingSenderId: "187925005810",
  appId: "1:187925005810:web:9bad2ba2abafb3e9f8d76b",
  measurementId: "G-1S2P0BBS74"
};

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.getToken(messaging,{
  vapidKey:"BNImNfacoJPlRHDtP122ejtjPMLlYD9OYZMOvLrbdfESKk3TY0NNSSTXVLHKdqeoufCvZxcn9ZCXk0qeztkGnAU"
}).then((currentToken)=>{
  if(currentToken){
      console.log(currentToken);
  }else{
      console.log("No Regiester Token")
  }
}).catch((err)=>{
  console.log("An error occured while retrieving token. ",err);
});

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});