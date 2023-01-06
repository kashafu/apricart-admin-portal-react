import React, { useState } from "react";

import { updateTickerApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";
import SingleAPILayout from "../../Layouts/SingleAPILayout";

const TickerUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "",
		prodType: "cus",
		orderType: "delivery",
		city: "karachi",
	});
	const [loading, setLoading] = useState(false);
	const { text, prodType, orderType, city } = inputs;

	const handleText = (e) => {
		setInputs({ ...inputs, text: e.target.value });
	};
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();

		await updateTickerApi(
			baseUrl,
			text,
			prodType,
			orderType,
			city,
			headers
		).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	}

	return (
		<SingleAPILayout
			heading={"Update Ticker"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Update"}
			gridItems={
				<>
					<CustomSelectInput
						position={"top"}
						onChange={(e) => handleProdType(e)}
						heading={"Select Product Type"}
						values={["b2b", "cus"]}
						options={["Online Delivery", "Customer"]}
					/>
					<CustomSelectInput
						onChange={(e) => handleOrderType(e)}
						heading={"Select Order Type"}
						values={["delivery", "pickup"]}
						options={["Delivery", "Pick up"]}
					/>
					<CustomSelectInput
						onChange={(e) => handleCity(e)}
						heading={"Select City"}
						values={["karachi", "peshawar"]}
						options={["Karachi", "Peshawar"]}
					/>
				</>
			}
			rowItems={
				<div className="relative m-2">
					<textarea
						className="z-20 block px-2.5 pb-2.5 py-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer"
						required
						placeholder=" "
						onChange={(e) => handleText(e)}
						name="ticker"
						cols="30"
						rows="10"
						maxLength={140}
						value={text}
					/>
					<label className="select-none flex absolute text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
						Enter Ticker Text
					</label>
				</div>
			}
		/>
	)
}

export default TickerUpdateAPIComponent;