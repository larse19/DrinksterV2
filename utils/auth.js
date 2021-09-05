import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';

firebase.initializeApp(Constants.manifest.extra.firebase);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
 if (user) 
     console.log("Logged in with user: ", user);
 else 
     console.log('Not logged in')
});


export const handleAuth = async () => {
    console.log(Constants.manifest.extra.facebook.appId)
 try {
     await Facebook.initializeAsync({appId: Constants.manifest.extra.facebook.appId}); // enter your Facebook App Id 
     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
       permissions: ['public_profile', 'email'],
     });
     if (type === 'success') {
       // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
       const credential = firebase.auth.FacebookAuthProvider.credential(token);
       firebase.auth().signInWithCredential(credential)
         .then(user => { // All the details about user are in here returned from firebase
           console.log('Logged in successfully', user)
         })
         .catch((error) => {
           console.log('Error occurred ', error)
         });
     } else {
       // type === 'cancel'
     }
 } catch ({ message }) {
     alert(`Facebook Login Error: ${message}`);
 }
}