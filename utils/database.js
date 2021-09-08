import firebase from "firebase";

const checkIfPartyIDExists = async (database, id) => {
  database
    .ref("parties")
    .once("value")
    .then((snapshot) => {
      return snapshot.child(id).exists();
    });
};

export const createParty = async (name, isPublic) => {
  const database = firebase.database();
  let id = parseInt(Math.random() * 1000000) + "";
  while (!checkIfPartyIDExists(database, id)) {
    id = parseInt(Math.random() * 1000000) + "";
  }
  const user = firebase.auth().currentUser.displayName;
  console.log(user);
  let partyObj = {
    name: name,
    owner: user,
    public: isPublic,
    location: {
      latitude: "55",
      longitude: "10",
    },
    participants: {},
  };
  partyObj.participants[user] = 0;
  database.ref("parties/" + id).set(partyObj);
};
