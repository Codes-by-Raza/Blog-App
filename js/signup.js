import {
    app,
    doc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    getDoc,
    auth,
    db,
  } from "./firebase.js";
  
  
  const email = document.querySelector("#inputEmail");
  const pass = document.querySelector("#inputPass");
  const name = document.querySelector("#name");
  const age = document.querySelector("#age");
  const Fname = document.querySelector("#Fname");
  const date = document.querySelector("#date");
  
  const authChecking = () => {
    const userid = localStorage.getItem("Uid");
  
    if (userid) {
      window.location.replace("../html/dashboard.html");
    }
  };
  
  const creating = async () => {
    try {
      if (!email.value || !pass.value) {
        alert("Please Enter Email or password");
        return;
      }
      if (!name.value || !age.value) {
        alert("Please Enter Name or Age");
        return;
      }
  
      if (!Fname.value || !date.value) {
        alert("Please Enter Fname or Date");
        return;
      }
  
      const response = await createUserWithEmailAndPassword(
        auth,
        email.value,
        pass.value
      );
      const id = response.user.uid;
      await setDoc(doc(db, "myUsers", id), {
        Name: name.value,
        age: age.value,
        email: email.value,
        pass: pass.value,
        fName: Fname.value,
        date: date.value,
      });
      alert("Account Created Succesfully");
      window.location.href = "../index.html";
    } catch (error) {
      alert(error.code);
    }
  };
  
  window.creating = creating;
  window.authChecking = authChecking;