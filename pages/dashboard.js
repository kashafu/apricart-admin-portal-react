import React, { useEffect, useState } from "react";

import Loading from "../utils/Loading";
import Heading from "../components/Misc/Heading";
import { getAllAPIsApi } from "../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setLoading(false);
		});
	};

	useEffect(() => {
		getSidebarItems();
	}, []);

	return (
		<>
			<Loading loading={loading} />
			<div className="flex justify-center items-center pl-10">
				<Heading>Welcome to the Dashboard</Heading>
			</div>
		</>
	);
};

export default Dashboard;
