
const firebaseConfig = {
      apiKey: "AIzaSyCZOE9sBOwvirCo-wkQyvv_7nAzq3nPmts",
      authDomain: "kwittwe-ca870.firebaseapp.com",
      databaseURL: "https://kwittwe-ca870-default-rtdb.firebaseio.com",
      projectId: "kwittwe-ca870",
      storageBucket: "kwittwe-ca870.appspot.com",
      messagingSenderId: "416565819848",
      appId: "1:416565819848:web:1b382f28a207b5da6a28fd"
}; // Initialize Firebase const app 
 firebase.initializeApp(firebaseConfig);
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("roomname-"+Room_names);
      row="<div class='room_name' id='"+Room_names+"' onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();
function addroom(){
room=document.getElementById("room").value;
firebase.database().ref("/").child(room).update({
      purpose :" adding roomnames "
});


localStorage.setItem("roomname",room);
window.location="kwitter_page.html";
}
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("roomname",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("roomname");
      localStorage.removeItem("username");
      window.location="index.html";
}
