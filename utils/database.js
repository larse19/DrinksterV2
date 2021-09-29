import firebase from "firebase";

const checkIfPartyIDExists = async (database, id) => {
  let obj = await database.ref("parties").once("value");
  return obj.child(id).exists();
};

const getUsersCurrentParty = async (database, id) => {
  let obj = await database.ref("users/" + id + "/party").get();
  console.log(obj);
  return obj;
};

const checkIfPartyIsInPrevious = async (userID, partyID) => {
  let obj = await firebase
    .database()
    .ref("users/" + userID + "/previousParties")
    .once("value");
  return obj.child(partyID).exists();
};

export const createParty = async (name, isPublic) => {
  const database = firebase.database();
  let id = parseInt(Math.random() * 1000000) + "";
  while (await checkIfPartyIDExists(database, id)) {
    console.log("new id");
    id = parseInt(Math.random() * 1000000) + "";
  }
  const user = firebase.auth().currentUser;
  let partyObj = {
    name: name,
    owner: user.uid,
    public: isPublic,
    participants: {},
    created: Date.now(),
  };
  partyObj.participants[user.uid] = {
    displayName: user.displayName,
    drinks: {
      beersAndCiders: 0,
      drinks: 0,
      shots: 0,
    },
  };
  database
    .ref("parties/" + id)
    .set(partyObj)
    .then(() => {
      return id;
    });
};

export const joinParty = async (partyID) => {
  const database = firebase.database();
  const user = firebase.auth().currentUser;
  if (await checkIfPartyIsInPrevious(user.uid, partyID)) {
    // User has been in the party before, and will therefore not be added to the pary again,
    // they will just rejoin it
    let updates = {};
    updates["users/" + user.uid + "/party"] = partyID;
    database.ref().update(updates);
  } else if (await checkIfPartyIDExists(database, partyID)) {
    // User hasn't been in the party before, and will be added
    let updates = {};
    updates["parties/" + partyID + "/participants/" + user.uid] = {
      displayName: user.displayName,
      drinks: 0,
    };
    updates["users/" + user.uid + "/party"] = partyID;
    database.ref().update(updates);
  } else {
    console.log("Party with id " + partyID + " doesn't exist");
  }
};

export const getPartyName = async (partyID) => {
  const obj = await firebase.database().ref("parties/").once("value");
  return obj.child("name");
};

export const addDrink = async (partyID, userID, drinkName, drinkVol) => {
  const database = firebase.database();
  database
    .ref(
      "parties/" + partyID + "/participants/" + userID + "/drinks/" + Date.now()
    )
    .set({ name: drinkName, vol: drinkVol });
};

export const leaveParty = async (userID, partyID) => {
  let updates = {};
  updates["users/" + userID + "/previousParties/" + partyID] = true;
  updates["users/" + userID + "/party"] = "None";
  firebase.database().ref().update(updates);
};
