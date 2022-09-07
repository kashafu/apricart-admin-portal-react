import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { recommendedUpdateApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

const RecommendedUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "APRA-BD02-01,APRA-HS23-05,APR-MP03-01,APRA-OL26-01,APRA-SC16-08,APRA-HS23-03,APR-PK03-01,APR-DT14-01,APR-DT40-01",
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await recommendedUpdateApi(
			baseUrl,
			prodType,
			orderType,
			city,
			text,
			headers
		).then((response) => {
			checkStatus(response);
		});
	};

	return (
		<div>
			<CustomInput
				position={"top"}
				type={"text"}
				value={text}
				onChange={handleText}
				required={true}
				placeholder={"Enter SKU's comma separated"}
			/>
			<select
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleProdType(e)}
			>
				<option disabled defaultChecked>
					Product Type
				</option>
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
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default RecommendedUpdateAPIComponent;
