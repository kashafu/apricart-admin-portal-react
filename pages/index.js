import Head from 'next/head'
import Login from '../components/Login'
import SideBar from '../components/SideBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       <div>
        {/* calling Sidebar */}
        {/* <SideBar/> */}
        {/* Calling Login component */}
        <Login/>
       </div>
      </main>
    </div>
  )
}
