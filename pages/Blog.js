import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as fs from 'fs';
//step 1: Collect all files from blogdata directory
//step 2 : Iterate through them and display them
const Blog = (props) => {
  const [count, setCount] = useState(2)
  // console.log(props)
  const [blogs, setBlogs] = useState(props.allBlogs);
  const fetchMoreData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
    let data = await d.json();
    setCount(count+2)
    setBlogs(data)
  };

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

        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          
        >
          
        {blogs.map((blogitem)=>{
          return  <div className={styles.blogItem} key={blogitem.title}>
                    <Link href={`/blogpost/${blogitem.slug}`}>
                        <h3>{blogitem.title}</h3>
                    </Link>    
                    <p>{blogitem.metaDesc.substr(0, 140)}...</p>
                    <p>Author : {blogitem.author}</p>
                  </div>
        })}
        </InfiniteScroll>

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
  let allCount = data.length;
  let myfile;
  let allBlogs = []
  for (let index = 0; index < 2; index++) {
    console.log(data[index])
    const item = data[index]
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }

  return{
    props: {allBlogs, allCount}
  }
}

export default Blog
