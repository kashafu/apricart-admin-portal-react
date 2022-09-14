import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import SideBar from "../components/SideBarComponent";
import { getAllAPIsApi } from "../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables";

const Dashboard = () => {
	const [apiList, setApiList] = useState(false);
	const [allApis, setAllApis] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setAllApis(response.data.data.apis);
			setLoading(false);
		});
	};

	useEffect(() => {
		getSidebarItems();
	}, []);

	return (
		<div className="flex">
			<Loading loading={loading} />
			<SideBar apiList={apiList} setApiList={setApiList} allApis={allApis} />
		</div>
	);
};

export default Dashboard;
