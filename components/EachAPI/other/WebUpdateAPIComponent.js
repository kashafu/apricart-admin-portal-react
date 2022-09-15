import React, { useState } from "react";

import { webUpdateApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";

const WebUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "APR-PT36-02,APR-LM03-03,APR-MP02-02,APR-OL12-01,APRA-OB03-04,APRA-OB10-11,APRA-OB06-01,APRA-OB08-01,APRA-BF11-01,APRA-OB43-03,APR-T07-00,APRA-OB05-01",
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

		await webUpdateApi(baseUrl, prodType, orderType, city, text, headers).then(
			(response) => {
				checkStatus(response);
			}
		);
	};

	return (
		<div>
			<Heading>Update Web</Heading>
			<CustomInput
				position={"top"}
				type={"text"}
				value={text}
				onChange={handleText}
				required={true}
				heading={"Enter SKU's comma separated"}
			/>
			<div>
				<p>Select Product Type</p>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border  border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleProdType(e)}
				>
					<option disabled defaultChecked>
						Product Type
					</option>
					<option value="cus">Customer (cus)</option>
					<option value="b2b">Bulk Buy (b2b)</option>
				</select>
			</div>

			<div>
				<p>Select Order Type</p>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border  border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleOrderType(e)}
				>
					<option disabled defaultChecked>
						Order Type
					</option>
					<option value="delivery">Delivery</option>
					<option value="pickup">Pick up</option>
				</select>
			</div>

			<div>
				<p>Select City</p>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-xl border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					placeholder="Product Type"
					onChange={(e) => handleCity(e)}
				>
					<option value="karachi">Karachi</option>
					<option value="peshawar">Peshawar</option>
				</select>
			</div>
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default WebUpdateAPIComponent;
