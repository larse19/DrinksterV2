import firebase from "firebase";
import Constants from "expo-constants";

if (firebase.apps.length === 0) {
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user) console.log("Logged in with user: ", user);
  else console.log("Not logged in");
});

export const signInWithEmail = async (email, password) => {
  //const auth = getAuth();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const createUser = async (username, email, password) => {
  const userObj = await firebase.database().ref("users").once("value");
  if (userObj.child(username).exists()) {
    console.log("Username already exists");
    return false;
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // Set username
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            // Create user in database
            console.log("User Created");
            firebase
              .database()
              .ref("users/" + userCredential.user.uid)
              .set({
                party: "None",
                previousParties: "None",
              })
              .then(() => {
                console.log("User Created in db");
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => {
            // An error occurred
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
};

export const signOutUser = async (navigation) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed out");
    })
    .catch((error) => {
      // An error happened.
    });
};

/*
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
*/
