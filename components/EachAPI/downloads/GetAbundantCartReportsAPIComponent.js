import React, { useState } from "react";
import { downloadAbundantCartApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import moment from "moment";

const GetAbundantCartReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [horas, setHoras] = useState(5);

	const fetchReport = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadAbundantCartApi(baseUrl, horas, headers).then(() =>
			setLoading(false)
		);
	};

	return (
		<section>
			<form>
				<Loading loading={loading} />
				<label>Enter Hours</label>
				<br />
				<input
					className="bg-gray-100 font-bold border-[1px] border-main-blue"
					type="number"
					value={horas}
					onChange={(e) => setHoras(e.target.value)}
				/>
				<br />
				<button
					// type="submit"
					onClick={(e) => fetchReport(e)}
					className="group relative w-1/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
				>
					Fetch Abundant Cart Report
				</button>
			</form>
		</section>
	);
};

export default GetAbundantCartReportsAPIComponent;
