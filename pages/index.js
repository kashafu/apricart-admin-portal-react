import Head from "next/head";
import Dashboard from "./dashboard";

export default function Home() {
	return (
		<>
			<Head>
				<title>Admin Portal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-full h-full">
				<Dashboard />
			</main>
		</>
	);
}
