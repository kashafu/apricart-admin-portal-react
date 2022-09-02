import React, { useState } from "react";

import { updateTickerApi } from "../../../utils/ApiCalls";
import CustomInput from "../../Misc/CustomInput";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";

const TickerUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "",
		prodType: "cus",
		orderType: "delivery",
		city: "karachi",
	});

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
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		const encodedText = encodeURI(text);

		await updateTickerApi(
			baseUrl,
			encodedText,
			prodType,
			orderType,
			city,
			headers
		).then((response) => {
			checkStatus(response);
		});
	};
	return (
		<section>
			<form action="" method="POST">
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleProdType(e)}
				>
					<option disabled>Product Type</option>
					<option value="cus">Customer (cus)</option>
					<option value="b2b">Bulk Buy (b2b)</option>
				</select>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleOrderType(e)}
				>
					<option disabled defaultChecked>
						Order Type
					</option>
					<option value="delivery">Delivery</option>
					<option value="pickup">Pick up</option>
				</select>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleCity(e)}
				>
					<option value="karachi">Karachi</option>
					<option value="peshawar">Peshawar</option>
				</select>
				<textarea
					required
					onChange={(e) => handleText(e)}
					name="ticker"
					cols="30"
					rows="10"
					className="bg-gray-200 w-full h-56 p-1"
					value={text}
				/>
				<label className="text-xs text-main-red font-nunito font-bold">
					To include the "&" sign, use &amp
				</label>{" "}
				<CustomButton
					onClick={(e) => submitHandler(e)}
					width="1/3"
					position={"left"}
				>
					Update Ticker
				</CustomButton>
			</form>
		</section>
	);
};

export default TickerUpdateAPIComponent;
