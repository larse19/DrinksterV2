// We should import firebase from this module instead of the default package.
import firebase from 'firebase'  // Should not be used elsewhere in the project
import Constants from 'expo-constants';

firebase.initializeApp(Constants.manifest.extra.firebase);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
 if (user) 
     console.log("Logged in with user: ", user);
 else 
     console.log('Not logged in')
});

export default firebase;