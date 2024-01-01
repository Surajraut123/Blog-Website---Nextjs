import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <style jsx>
      {`
        .myImg{
          border-radius: 10px
        }
      `}
    </style>
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keywords" content="nextjs, hunting blog, hunting coder" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="/sc.js"></script> */}
      </Head>

      {/* <Script src='/sc.js' strategy='lazyOnload'></Script> */}
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p className='dummy'>
            A blog for hunting coders by a hunting coders
          </p>
          <Image className={styles.myImg} src="/coder.jpg" alt="loading" width={237} height={158}/>
          <div >
            <h2>
              Popular Blogs
            </h2>
            <div className="blogitem dummy">
              <h3>How to learn javascript in 2023</h3>
              <p>Javascript is the language use to design logic for th web</p>
            </div>
            <div className="blogitem">
              <h3>How to learn javascript in 2023</h3>
              <p>Javascript is the language use to design logic for th web</p>
            </div>
            <div className="blogitem">
              <h3>How to learn javascript in 2023</h3>
              <p>Javascript is the language use to design logic for th web</p>
            </div>
            <div className="blogitem">
              <h3>How to learn javascript in 2023</h3>
              <p>Javascript is the language use to design logic for th web</p>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}