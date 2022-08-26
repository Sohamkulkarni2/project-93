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
room_name = localStorage.getItem("roomname");
user_name = localStorage.getItem("username");

function send() {
      msg = document.getElementById("comment").value;
      firebase.database().ref(room_name).push({
            username: user_name,
            message: msg,
            like: 0

      });
      document.getElementById("comment").value = " ";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data)
                        name=message_data['username'];
                        message=message_data['message'];
                        likes=message_data['like'];
                        nametag="<h4>"+name+"<img src='tick.png' class='user_tick'></h4>";
                        messagetag="<h4>"+message+"</h4>";
                        buttontag="<button class='btn btn-warning' id="+firebase_message_id+" onclick='updatelike(this.id)' value='"+likes+"'><span class='glyphicon glyphicon-thumbs-up'>Like:"+likes+" </span></button> <hr>";
                        row=nametag+messagetag+buttontag;
                        document.getElementById("output").innerHTML+=row;
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("roomname");
      localStorage.removeItem("username");
      window.location = "index.html";
}
function updatelike(msgid){
      likes=document.getElementById(msgid).value;
      updatelikes=Number(likes)+1;
      firebase.database().ref(room_name).child(msgid).update({like:updatelikes});
}

