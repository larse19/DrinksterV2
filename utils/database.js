import firebase from "firebase";

const checkIfPartyIDExists = async (database, id) => {
  let obj = await database.ref("parties").once("value");
  return obj.child(id).exists();
};

export const createParty = async (name, isPublic) => {
  const database = firebase.database();
  let id = parseInt(Math.random() * 1000000) + "";
  while (await checkIfPartyIDExists(database, id)) {
    console.log("new id");
    id = parseInt(Math.random() * 1000000) + "";
  }
  const user = firebase.auth().currentUser.displayName;
  let partyObj = {
    name: name,
    owner: user,
    public: isPublic,
    location: {
      latitude: "55",
      longitude: "10",
    },
    participants: {},
    created: Date.now(),
  };
  partyObj.participants[user] = 0;
  database.ref("parties/" + id).set(partyObj);
};

export const joinParty = async (partyID) => {
  const database = firebase.database();
  const user = firebase.auth().currentUser.displayName;
  if (await checkIfPartyIDExists(database, partyID)) {
    database
      .ref("parties/" + partyID + "/participants/" + user)
      .set(0) // Add user to party, with 0 drinks
      .then(() => {
        database.ref("users/" + user + "/party").set(partyID); // Set the current party on the user object
      })
      .then(() => {
        console.log("User joined party; " + partyID);
      })
      .catch(() => {
        console.log("Failed to join party");
      });
  } else {
    console.log("Party with id " + partyID + " doesn't exist");
  }
};
