import React from "react";
import { downloadUsersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";

const UsersReports = () => {
	const fetchReport = () => {
		const { baseUrl, headers } = getGeneralApiParams();
		downloadUsersApi(baseUrl, headers);
	};

	return (
		<div>
			<button
				type="submit"
				onClick={(e) => fetchReport(e)}
				className="group relative w-1/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
			>
				Fetch Report
			</button>
		</div>
	);
};

export default UsersReports;
