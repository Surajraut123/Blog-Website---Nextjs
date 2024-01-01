
import React, { useEffect, useState } from 'react'
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';
//Step 1: Find th file responding to the slug
// Step 2: Poulate them inside the page
const Slug = (props) => {

  function createMarkup(c) {
    return {__html: c};
  }

  const[blog, setBlog] = useState(props.myBlog);
  //Commented For ServerSide Rendering Using ServerSideProps Function

  // const router = useRouter();
  // const[blog, setBlog] = useState();
  // useEffect(()=>{
  //   if(!router.isReady) return
  //   const {slug} = router.query;
  //     fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a)=>{
  //       return a.json()
  //     }).then((parsed)=>{
  //       console.log(parsed)
  //       setBlog(parsed)
  //   })
  // },[router.isReady])


  return <div className={styles.container}>
    <main className={styles.main}>
    <h1>{blog && blog.title}</h1>
    <hr />
    {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
    </main>
  </div>
}
// export async function getServerSideProps(context) {
//   // console.log(context.req.url)
//   // const router = useRouter();
//     const {slug} = context.query;
//     let data= await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//     let blog = await data.json();

//   return{
//     props: {blog}
//   }
// }

export async function getStaticPaths() {
  return {
    paths : [
      {params: {slug: 'how-to-learn-flask'}},
      {params: {slug: 'how-to-learn-javascript'}},
      {params: {slug: 'how-to-learn-nextjs'}}
    ],
    fallback: true
  }
}

export async function getStaticProps(context) {
  console.log(context)
  // const router = useRouter();
    const {slug} = context.params;
    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
  return{
    props: {myBlog: JSON.parse(myBlog)}
  }
}
export default Slug
