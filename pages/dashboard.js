import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Loading from "../utils/Loading";
import Heading from "../components/Misc/Heading";
import { getAllAPIsApi } from "../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables";

const Dashboard = () => {
	const DynamicReports = dynamic(() =>
		import("../components/DashboardReports").then(
			(dashboard) => dashboard.default
		)
	);
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
			<section className="w-full h-full bg-orange-400">
				<DynamicReports />
			</section>
		</>
	);
};

export default Dashboard;
