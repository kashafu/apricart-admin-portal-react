import React, { useState } from "react";
import { downloadProductsApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";

const GetProductReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(false);

	const fetchReport = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadProductsApi(baseUrl, headers, summary).then(() =>
			setLoading(false)
		);
	};
	return (
		<section>
			<form>
				<Loading loading={loading} />
				<p>Summary Version</p>
				<label htmlFor="summary">Yes</label>
				<input type={"radio"} value="yes" name="summary" defaultChecked />
				<label htmlFor="summary">No</label>
				<input type={"radio"} value="no" name="summary" />
				<button
					// type="submit"
					onClick={(e) => fetchReport(e)}
					className="group relative w-1/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
				>
					Fetch Product Report
				</button>
			</form>
		</section>
	);
};

export default GetProductReportsAPIComponent;
