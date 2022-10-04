import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/globals.css";
import { useRouter } from "next/router";

import Navbar from "../components/Misc/Navbar";
import SideBar from "../components/SideBarComponent";
import { useEffect, useState } from "react";
import { getAllAPIsApi } from "../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	logOutRemoveCookies,
} from "../utils/GeneralVariables";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const cookies = new Cookies();
	axios.defaults.headers.common["Authorization"] =
		"Bearer " + cookies.get("cookies-token");

	const [apiList, setApiList] = useState(false);
	const [allApis, setAllApis] = useState([]);
	const [loading, setLoading] = useState(true);
	let token = cookies.get("cookies-token");

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status ? getCurrentAddress(response.data.data.apis, status) : "";
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
	useEffect(() => {}, []);
	return (
		<>
			<div className="pb-12">{router.pathname !== "/login" && <Navbar />}</div>
			{router.pathname !== "/login" && (
				<SideBar apiList={apiList} setApiList={setApiList} allApis={allApis} />
			)}
			<section>
				<Component {...pageProps} />
			</section>
			<ToastContainer />
		</>
	);
}

export default MyApp;
