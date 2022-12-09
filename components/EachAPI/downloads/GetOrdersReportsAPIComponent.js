import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadOrdersApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import moment from "moment";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";
import CustomRadioInput from "../../Misc/CustomRadioInput";
import CustomInput from "../../Misc/CustomInput";

const GetOrdersReportsAPIComponent = () => {
	const [disabler, setDisabler] = useState(false);
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
		).then((response) => {
			let status = checkStatus(response);
			status &&
				displayInfoToast(
					"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
					6000
				);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};
	return (
		<section className="px-10">
			{/* <Heading>Total Orders Report</Heading> */}
			<Loading loading={loading} />
			<form>
				<section className="grid grid-cols-2 pt-6">
					<CustomRadioInput
						inputs={["Peshawar", "Karachi"]}
						values={["4", "1"]}
						heading={"Select City"}
						name={"city"}
						onChange={(e) => setInputs({ ...inputs, cityId: e.target.value })}
					/>
					<CustomInput
						heading={"From Date"}
						value={fromDate}
						onChange={(e) =>
							setInputs({
								...inputs,
								fromDate: moment(e.target.value).format("YYYY-MM-DD"),
							})
						}
						required={true}
						type="date"
					/>
					<CustomInput
						heading={"To Date"}
						onChange={(e) =>
							setInputs({
								...inputs,
								toDate: moment(e.target.value).format("YYYY-MM-DD"),
							})
						}
						required={true}
						type="date"
					/>
				</section>
				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
				>
					Download Orders Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetOrdersReportsAPIComponent;
