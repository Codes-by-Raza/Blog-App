import {
    addDoc,
    deleteDoc,
    updateDoc,
    auth,
    collection,
    db,
    doc,
    setDoc,
    getDoc,
    getDocs,
  } from "./firebase.js";
  
  const authChecking = () => {
    const userid = localStorage.getItem("Uid");
  
    if (!userid) {
      window.location.replace("../index.html");
    }
  };
  
  const getBlog = async () => {
    try {
      const parent = document.querySelector(".blog-container");
      const data = await getDocs(collection(db, "blogs"));
      parent.innerHTML = "";
      data.forEach((doc) => {
        if (doc.data().uid === localStorage.getItem("Uid")) {
          parent.innerHTML += ` <div class="blog-content">
          <h2 class = "heading-2" >${doc.data().title}</h2>
          <h3>${doc.data().desc}</h3>

          <h4 class="${doc.data().isPrivate ? 'status private' : 'status public'}">
  ${doc.data().isPrivate ? "Private" : "Public"}
</h4>

          <button onclick = "editing('${doc.id}')" class = "dynamic-button" >Edit</button>
          <button onclick = "deleting('${doc.id}')" class = "dynamic-button" >Delete</button>
      </div> </br>`;
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };
  
  const editing = async (id) => {
    try {
  
      const updateTitle = prompt("Enter Title Value : ");
      const updateDescription = prompt("Enter Description Value : ");
      if (!updateDescription || !updateTitle) {
        alert(" Kindly enter blog!");
        return;
      }
      await updateDoc(doc(db, "blogs", id), {
        title: updateTitle,
        desc: updateDescription,
      });
      alert("Updated Successfully");
      getBlog();
    } catch (error) {
      alert(error.message);
    }
  };
  const deleting = async (id) => {
    try {
  
      await deleteDoc(doc(db, "blogs", id));
      alert("Deleted Successfully");
      getBlog();
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

  window.editing = editing;
  window.deleting = deleting;
  window.getBlog = getBlog;
  window.authChecking = authChecking;
  window.logout = logout;