import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	downloadAbundantCartApi,
	downloadOutOfStockApi,
} from "../../../utils/ApiCalls";
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";

const GetProductsOutOfStockAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(false);
	const [disabler, setDisabler] = useState(false);

	const fetchReport = async (e) => {
		setDisabler(true);
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadOutOfStockApi(baseUrl, summary, headers).then(() => {
			setLoading(false);
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				5000
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};

	return (
		<section>
			<h1>Get Products Out Stock</h1>
			<form>
				<Loading loading={loading} />
				<label>Do you require the summary version</label>
				<br />
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => setSummary(e.target.value)}
				>
					<option value="false">No</option>
					<option value="true">Yes</option>
				</select>
				<br />
				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
					position={"left"}
				>
					Download Out of Stock Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetProductsOutOfStockAPIComponent;
