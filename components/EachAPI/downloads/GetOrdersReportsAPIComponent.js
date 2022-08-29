import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadOrdersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import moment from "moment";
import CustomButton from "../../Misc/CustomButton";

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
			console.log(response);
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

				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
					position={"left"}
				>
					Download Orders Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetOrdersReportsAPIComponent;
