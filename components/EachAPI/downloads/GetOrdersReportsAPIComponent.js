import React, { useState } from "react";
import { downloadOrdersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import moment from "moment";

const GetOrdersReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
		cityId: 1,
		toDate: "",
		fromDate: "",
		skus: {},
	});

	const { cityId, toDate, fromDate, skus } = inputs;

	const fetchReport = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadOrdersApi(
			baseUrl,
			cityId,
			fromDate,
			toDate,
			skus,
			headers
		).then(() => setLoading(false));
	};
	console.log(inputs);
	return (
		<section>
			<form>
				<Loading loading={loading} />
				<p>Select City</p>
				<input
					type={"radio"}
					value="1"
					name="city"
					defaultChecked
					onChange={(e) => setInputs({ ...inputs, cityId: e.target.value })}
				/>
				<label>Karachi</label>
				<input
					type={"radio"}
					value="4"
					name="city"
					onChange={(e) => setInputs({ ...inputs, cityId: e.target.value })}
				/>
				<label>Peshawar</label>
				<br />
				<label>From Date: </label>
				<input
					type="date"
					value={fromDate}
					onChange={(e) =>
						setInputs({
							...inputs,
							fromDate: moment(e.target.value).format("YYYY-MM-DD"),
						})
					}
				/>
				<br />
				<label>To Date: </label>
				<input
					type="date"
					value={toDate}
					onChange={(e) =>
						setInputs({
							...inputs,
							toDate: moment(e.target.value).format("YYYY-MM-DD"),
						})
					}
				/>

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

export default GetOrdersReportsAPIComponent;
