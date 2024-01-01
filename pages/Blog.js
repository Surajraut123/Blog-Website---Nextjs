import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';
//step 1: Collect all files from blogdata directory
//step 2 : Iterate through them and display them

const Blog = (props) => {
  // console.log(props)
  const [blogs, setBlogs] = useState(props.allBlogs);
  // const [blogs, setBlogs] = useState([]);
  
  //For Server Side Rendering we will use ServerSdeProps function to show data in html not useEffect here
  // useEffect(()=>{
  //   fetch("http://localhost:3000/api/blogs").then((a)=>{
  //     return a.json()
  //   }).then((parsed)=>{
  //     console.log(parsed)
  //     setBlogs(parsed)
  //   })
  // }, [])
  return (
    <div className={styles.container}>
        <main className={styles.main}>

        {blogs.map((blogitem)=>{
          return  <div className={styles.blogItem} key={blogitem.title}>
                    <Link href={`/blogpost/${blogitem.slug}`}>
                        <h3>{blogitem.title}</h3>
                    </Link>    
                    <p>{blogitem.metaDesc.substr(0, 140)}...</p>
                    <p>Author : {blogitem.author}</p>
                  </div>
        })}

    </main>
  </div>
  )
}

//This is for ServerSide Rendering
// export async function getServerSideProps(context) {
//   let data = await fetch("http://localhost:3000/api/blogs")
//   let allBlogs = await data.json()

//   return{
//     props: {allBlogs}
//   }
// }

//Static Side Rendering
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let myfile;
  let allBlogs = []
  for (let index = 0; index < data.length; index++) {
    console.log(data[index])
    const item = data[index]
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }

  return{
    props: {allBlogs}
  }
}

export default Blog
