import { ToastContainer } from "react-toastify"
import Cookies from "universal-cookie"
import axios from "axios"
import "../styles/globals.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "../Redux/store"
import { ConfigProvider } from "react-avatar"

import Navbar from "../components/Misc/Navbar"
import { getAllAPIsApi } from "../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../utils/GeneralVariables"
import SideBar from "../components/SideBar"

const Layout = ({ children }) => {
	const router = useRouter()
	const cookies = new Cookies()

	const [apiList, setApiList] = useState(false)
	const [allApis, setAllApis] = useState([])
	const [loading, setLoading] = useState(true)

	let token = cookies.get("cookies-token")
	let name = cookies.get("cookies-name")

	useEffect(() => {
		router.pathname !== "/login" && getSidebarItems()
	}, [token, router])

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams()
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "")
			setLoading(false)
		})
	}

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
