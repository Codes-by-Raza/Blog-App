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
  
  const blogPost = async () => {
    try {
      const title = document.querySelector("#title");
      const desc = document.querySelector("#desc");
      const checkbox = document.querySelector("#checkbox");
      if (!title.value || !desc.value) {
        alert(" Kindly enter blog!");
        return;
      }
      const id = localStorage.getItem("Uid");
      const obj = {
        title: title.value,
        desc: desc.value,
        isPrivate: checkbox.checked,
        uid: id,
      };
      await addDoc(collection(db, "blogs"), obj);
      alert("blog created successfully!");
      getBlog();
      title.value = "";
      desc.value = "";
      checkbox.checked = "";
    } catch (error) {
      alert(error.message);
    }
  };
  
  const getBlog = async () => {
    try {
      const parent = document.querySelector(".parent");
      const data = await getDocs(collection(db, "blogs"));
      parent.innerHTML = "";
      data.forEach((doc) => {
        if (doc.data().uid === localStorage.getItem("Uid")) {
          parent.innerHTML += ` <div class="blog">
          <h2 class ="bd-top" >${doc.data().title}</h2>
          <h3>${doc.data().desc}</h3> 

          <h4 class="${doc.data().isPrivate ? 'status private' : 'status public'}">
  ${doc.data().isPrivate ? "Private" : "Public"}
</h4>


          <button onclick = "editing('${doc.id}')" class = "dynamic-button" >Edit</button>
          <button onclick = "deleting('${doc.id}')" class = "dynamic-button" >Delete</button>
      </div>`;
        } else {
          parent.innerHTML += `<div class="blog">
          <h2 class ="bd-top" >${doc.data().title}</h2>
          <h3>${doc.data().desc}</h3>
          <h4 class ="public" >${doc.data().isPrivate ? "Private" : "Public"}</h4>
      </div>`;
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
      getBlog();
    } catch (error) {
      alert(error.message);
    }
  };
  
  window.authChecking = authChecking;
  window.blogPost = blogPost;
  window.getBlog = getBlog;
  window.editing = editing;
  window.deleting = deleting;
  window.logout = logout;