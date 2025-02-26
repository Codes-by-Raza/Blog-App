import {
    app,
    doc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    getDoc,
    updateDoc,
    auth,
    db,
  } from "./firebase.js";
  
  const authChecking = () => {
    const userid = localStorage.getItem("Uid");
  
    if (!userid) {
      window.location.replace("../index.html");
    }
  };
  
  const form = document.querySelector(".form");
  const getProf = async () => {
    try {
      const id = localStorage.getItem("Uid");
      const data = await getDoc(doc(db, "myUsers", id));
  
      form.innerHTML = `<div>
      <h1 class ="under">Email :</h1>
                  <h2>${data.data().email} </h2><hr><br>
                  <h1 class = "under">Name :</h1>
                  <h2>${data.data().Name} </h2>
                  <button class = "btn" onclick = "editingName()">Edit</button><hr><br>
                  <h1 class ="under">Father Name :</h1>
                  <h2>${data.data().fName} </h2>
                  <button class = "btn" onclick = "editingFname()">Edit</button><hr><br>
                  
                  <h1 class ="under">Age :</h1>
                  <h2>${data.data().age} </h2>
                  <button class = "btn" onclick = "editingAge()">Edit</button><hr><br>
                  <h1 class ="under">Date :</h1>
                  <h2>${data.data().date} </h2>
                  <button class = "btn" onclick = "editingDate()">Edit</button>
              </div>`;
    } catch (error) {
      alert(error.message);
    }
  };
  
  const editingName = async () => {
    try {
      const id = localStorage.getItem("Uid");
      const name = prompt("Enter your Name :  ");
      if (name === "") {
        alert("Kindly enter name! ");
        return;
      }
      const document = await doc(db, "myUsers", id);
      await updateDoc(document, {
        Name: name,
      });
      alert("Successfulyy Updated");
  
      getProf();
    } catch (error) {
      alert(error.message);
    }
  };
  const editingAge = async () => {
    try {
      const id = localStorage.getItem("Uid");
      const age = prompt("Enter your Age :  ");
      if (age === "") {
        alert("Kindly enter age! ");
        return;
      }
      const document = await doc(db, "myUsers", id);
      await updateDoc(document, {
        age: age,
      });
      alert("Successfulyy Updated");
  
      getProf();
    } catch (error) {
      alert(error.message);
    }
  };
  const editingDate = async () => {
    try {
      const id = localStorage.getItem("Uid");
      const date = prompt("Enter your Date :  ");
      if (date === "") {
        alert("Kindly enter date! ");
        return;
      }
      const document = await doc(db, "myUsers", id);
      await updateDoc(document, {
        date: date,
      });
      alert("Successfulyy Updated");
  
      getProf();
    } catch (error) {
      alert(error.message);
    }
  };
  const editingFname = async () => {
    try {
      const id = localStorage.getItem("Uid");
      const Fname = prompt("Enter your Father Name :  ");
      if (Fname === "") {
        alert("Kindly enter Father name! ");
        return;
      }
      const document = await doc(db, "myUsers", id);
      await updateDoc(document, {
        fName: Fname,
      });
      alert("Successfulyy Updated");
  
      getProf();
    } catch (error) {
      alert(error.message);
    }
  };
  
  const logout = () => {
    try {
      localStorage.removeItem("Uid");
      alert("Logged out successfully!");
      window.location.replace("../index.html");
      getProf();
    } catch (error) {
      alert(error.message);
    }
  };
  window.getProf = getProf;
  window.logout = logout;
  window.editingName = editingName;
  window.editingAge = editingAge;
  window.editingDate = editingDate;
  window.authChecking = authChecking;
  window.editingFname = editingFname;