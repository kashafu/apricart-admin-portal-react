import Head from "next/head";
import styles from "../styles/Home.module.css";
import Dashboard from "./dashboard";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Admin Portal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div>
					<Dashboard />
				</div>
			</main>
		</div>
	);
}
