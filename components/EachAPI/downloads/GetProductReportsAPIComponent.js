import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadProductsApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";

const GetProductReportsAPIComponent = () => {
	const [disabler, setDisabler] = useState(false);
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(false);

	const fetchReport = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadProductsApi(baseUrl, headers, summary).then(() => {
			setDisabler(true);
			setLoading(false);
			toast.info(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: "XD",
				}
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
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

				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
					position={"left"}
				>
					Download Product Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetProductReportsAPIComponent;
