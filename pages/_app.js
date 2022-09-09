import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/globals.css";
import { useRouter } from "next/router";

import Navbar from "../components/Misc/Navbar";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const cookies = new Cookies();
	axios.defaults.headers.common["Authorization"] =
		"Bearer " + cookies.get("cookies-token");
	return (
		<>
			{router.pathname !== "/login" && <Navbar />}
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default MyApp;
