import "../styles/globals.css"

import { ToastContainer } from "react-toastify"
import Cookies from "universal-cookie"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Provider } from "react-redux"
import { store } from "../Redux/store"
import { ConfigProvider } from "react-avatar"

import Navbar from "../components/Misc/Navbar"
import SideBar from "../components/SideBar"

const Layout = ({ children }) => {
	const router = useRouter()
	const cookies = new Cookies()

	const [apiList, setApiList] = useState(false)
	const [allApis, setAllApis] = useState([])
	let name = cookies.get("cookies-name")

	return (
		<div className="min-h-screen w-screen flex">
			{router.pathname !== "/login" && (
				<div className="pb-12 z-50">
					<Navbar name={name} />
				</div>
			)}
			{router.pathname !== "/login" && (
				<section className="z-40">
					<SideBar
						apiList={apiList}
						setApiList={setApiList}
						allApis={allApis}
						setAllApis={setAllApis}
					/>
				</section>
			)}
			<section
				className={
					router.pathname === "/login"
						? "grow"
						: "grow ml-16 mt-12"
				}
			>
				{children}
			</section>
			<ToastContainer />
		</div>
	)
}

function MyApp({ Component, pageProps }) {
	const cookies = new Cookies()
	axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.get("cookies-token")

	return (
		<Provider store={store}>
			<ConfigProvider colors={["blue", "mediumblue", "darkblue", "navy"]}>
				<Layout>
					<Component {...pageProps} />
					<ToastContainer />
				</Layout>
			</ConfigProvider>
		</Provider>
	)
}

export default MyApp
