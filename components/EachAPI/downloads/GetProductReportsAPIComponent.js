import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadProductsApi } from "../../../utils/ApiCalls";
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

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
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				8000
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Download Product Reports</Heading>
			<form>
				<CustomSelectInput
					options={["Yes", "No"]}
					values={["true", "false"]}
					heading={"Summary Version?"}
					onChange={(e) => handleState(e)}
				/>

				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
				>
					Download Product Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetProductReportsAPIComponent;
