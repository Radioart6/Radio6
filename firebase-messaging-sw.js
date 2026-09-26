// Importation des scripts de compatibilité Firebase nécessaires pour le Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialisation de Firebase avec ton projet
firebase.initializeApp({
  apiKey: "AIzaSyAYBWye8p-yu2l8u4hz4_vCjslA0m3kXxM",
  authDomain: "radio6-notifications.firebaseapp.com",
  projectId: "radio6-notifications",
  storageBucket: "radio6-notifications.firebasestorage.app",
  messagingSenderId: "58894611602",
  appId: "1:58894611602:web:04627706b72d4701bee24b"
});

// Récupération de l'instance de messagerie
const messaging = firebase.messaging();

// Optionnel : Gestion des notifications reçues lorsque l'application est en arrière-plan
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message reçu en arrière-plan ', payload);
  
  const notificationTitle = payload.notification.title || "Radio 6";
  const notificationOptions = {
    body: payload.notification.body || "Nouveau direct en approche !",
    icon: './logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
