import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadUsersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";
import Loading from "../../../utils/Loading";

const GetUsersReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [disabler, setDisabler] = useState(false);
	const fetchReport = async () => {
		setDisabler(true);
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadUsersApi(baseUrl, headers).then((res) => {
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
		});

		setTimeout(() => {
			setDisabler(false);
		}, 8000);
	};

	return (
		<section>
			<Loading loading={loading} />
			<Heading>Fetch All Users Report</Heading>
			<CustomButton
				onClick={(e) => fetchReport(e)}
				disabled={disabler}
				width={"1/3"}
			>
				Download User Report
			</CustomButton>
		</section>
	);
};

export default GetUsersReportsAPIComponent;
