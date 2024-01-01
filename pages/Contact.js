import React, { useState } from 'react'
import styles from '../styles/contact.module.css'


const Contact = () => {
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const[desc,setDesc] = useState('')
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(name, email, phone, desc)
    const data = {name, email, phone, desc}

    async function postJSON(data) {
      try {
        const response = await fetch("http://localhost:3000/api/postcontact", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.text();
        console.log("Success:", result);
        alert("Thanks for contacting us");
        setDesc('');
        setName('');
        setEmail('');
        setPhone('');
      } catch (error) {
        console.error("Error:", error);
      }
    }
    postJSON(data);
    
  }
  const handleChange = (e) =>{
    if(e.target.name == 'name') {
      setName(e.target.value);
    }
    if(e.target.name == 'phone') {
      setPhone(e.target.value);
    }
    if(e.target.name == 'email') {
      setEmail(e.target.value);
    }
    if(e.target.name == 'desc') {
      setDesc(e.target.value);
    }
  }
  return (
    <div className={styles.container}>
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <div class={styles.mb3}>
          <label htmlFor="name" class="form-label">Name</label>
          <input type="text" value={name} onChange={handleChange} class="form-control" id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div class={styles.mb3}>
          <label htmlFor="email" class="form-label">Email</label>
          <input type="email" value={email} onChange={handleChange} class="form-control" id="email" name='email' aria-describedby="emailHelp"/>
        </div>
        <div class={styles.mb3}>
          <label htmlFor="phone" class="form-label">Password</label>
          <input type="phone" value={phone} onChange={handleChange} class="form-control" id="phone" name='phone'/>
        </div>
        <div class={styles.mb3}>
          <label for="floatingTextarea">Illaborate Your concern</label>
          <textarea class="form-control" value={desc} onChange={handleChange} placeholder="Write your concern" id="desc" name='desc'/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Contact
