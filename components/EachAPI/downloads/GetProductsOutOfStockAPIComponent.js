import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadOutOfStockApi } from "../../../utils/ApiCalls";
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const GetProductsOutOfStockAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(false);
	const [disabler, setDisabler] = useState(false);

	const handleState = (e) => {
		setSummary(e.target.value);
	};

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
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Out of Stock Report</Heading>
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
					Download Out of Stock Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetProductsOutOfStockAPIComponent;
