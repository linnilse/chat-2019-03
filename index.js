//index.js
import firebase from "./firebase";
import "firebase/database"; // use database


const db = firebase.database();
const messeges = db.ref().child("messeges");
//const messeges = db.ref().child("messeges").orderByChild("Name").equalTo("Karin");

let name;
$("#login").submit(function (event) {
    event.preventDefault();
    name = $("#name").val();
    if (name.length > 3) {
        $('#data').show(1000);
        $('#result').show(1000);
        $(this).hide(1000);
    }
})



$("#data").submit(function (event) {
    event.preventDefault();
    const message = $("#message").val();
    const primaryKey = messeges.push().key;
    if (message.length > 3) {
        messeges.child(primaryKey).set({
            "key": primaryKey,
            "Name": name,
            "Message": message,
        });
    }
})

messeges.on('child_added', (snapshot) => {
    //console.log("A child was added!");
    //console.log(snapshot.val()); //write out the added child
    let myArray = document.getElementsByClassName("prepend_messege");
    console.log(myArray);
    if (myArray.length == 5) {
        myArray[myArray.length - 1].parentNode.removeChild(myArray[myArray.length - 1])
    }
    $('#result').prepend(
        `<div class="prepend_messege">  
                <p class="data-name">${snapshot.val().Name}</p>
                <p class="data-message">${snapshot.val().Message}</p>
                </div>`
    );

});


messeges.on('child_removed', (snapshot) => {
    console.log("A child was removed!");
    console.log(snapshot.val()); // write out the deleted child
});

messeges.on('child_changed', (snapshot) => {
    console.log("A change in one child has occurred!");
    console.log(snapshot.val()); // write out the modified child
});




