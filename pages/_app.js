import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import "../styles/globals.css";
import { useRouter } from "next/router";

import Navbar from "../components/Misc/Navbar";
import SideBar from "../components/SideBarComponent";
import { useEffect, useState } from "react";
import { getAllAPIsApi } from "../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables";

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
			status && setAllApis(response.data.data.apis);
			setLoading(false);
		});
	};

	useEffect(() => {
		router.pathname !== "/login" && getSidebarItems();
	}, [token]);
	return (
		<>
			{router.pathname !== "/login" && <Navbar />}
			{router.pathname !== "/login" && (
				<SideBar apiList={apiList} setApiList={setApiList} allApis={allApis} />
			)}
			<section className="pl-[2.6rem]">
				<div className="w-8 "></div>
				<Component {...pageProps} />
			</section>
			<ToastContainer />
		</>
	);
}

export default MyApp;
