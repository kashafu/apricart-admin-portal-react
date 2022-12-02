import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/globals.css";
import { useRouter } from "next/router";

import Navbar from "../components/Misc/Navbar";
import { Provider } from "react-redux";
import SideBar from "../components/SideBarComponent";
import { useEffect, useState } from "react";
import { getAllAPIsApi } from "../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	logOutRemoveCookies,
} from "../utils/GeneralVariables";
import SideBarNewComponent from "../components/SideBarNewComponent";
import { store } from "../Redux/store";
import { ConfigProvider } from "react-avatar";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const cookies = new Cookies();
	axios.defaults.headers.common["Authorization"] =
		"Bearer " + cookies.get("cookies-token");

	const [apiList, setApiList] = useState(false);
	const [allApis, setAllApis] = useState([]);
	const [loading, setLoading] = useState(true);
	let token = cookies.get("cookies-token");
	let name = cookies.get("cookies-name");

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			// status ? getCurrentAddress(response.data.data.apis, status) : "";
		});
	};

	const getCurrentAddress = (array, status) => {
		let path = getPathVariable();
		if (array.some((e) => e.endpoint === path || path === "/admin")) {
			/* response contains the element we're looking for */
			setLoading(false);
			status && setAllApis(array);
		} else {
			displayErrorToast(
				"Unauthorized to use this feature, You have been logged out"
			);
			logOutRemoveCookies();
			router.push("/login");
		}
	};

	const getPathVariable = () => {
		let path = window.location.pathname;
		if (path === "/admin") return "/admin";
		let newPath = path.slice(6);
		return newPath;
	};

	useEffect(() => {
		router.pathname !== "/login" && getSidebarItems();
	}, [token, router]);

	return (
		<Provider store={store}>
			<ConfigProvider colors={["red", "green", "gray", "yellow"]}>
				<div className="min-h-screen w-screen flex">
					{router.pathname !== "/login" && (
						<div className="pb-12 z-50">
							<Navbar name={name} />
						</div>
					)}
					{router.pathname !== "/login" && (
						// <SideBar apiList={apiList} setApiList={setApiList} allApis={allApis} />
						<section className="z-40">
							<SideBarNewComponent
								apiList={apiList}
								setApiList={setApiList}
								allApis={allApis}
							/>
						</section>
					)}
					<section className="grow pt-12 pl-6">
						<Component {...pageProps} />
					</section>
					<ToastContainer />
				</div>
			</ConfigProvider>
		</Provider>
	);
}

export default MyApp;
