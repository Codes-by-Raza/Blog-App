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
  
  
  const authChecking = () => {
    const userid = localStorage.getItem("Uid");
  
    if (userid) {
      window.location.replace("../html/dashboard.html");
    }
  };
  
  const loginHandle = async () => {
    try {
      if (!email.value || !pass.value) {
        alert("Please Enter Email or password");
        return;
      }
      const response = await signInWithEmailAndPassword(
        auth,
        email.value,
        pass.value
      );
      const id = response.user.uid;
      const uid = localStorage.setItem("Uid", id);
      const userData = await getDoc(doc(db, "myUsers", id));

      alert("Account Login Successfully");
      window.location.replace("../html/dashboard.html");
    } catch (error) {
      alert(error.code);
    }
  };
  
  window.loginHandle = loginHandle;
  window.authChecking = authChecking;