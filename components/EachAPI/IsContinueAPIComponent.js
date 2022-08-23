import React, { useState } from "react";
import { isContinueUpdateApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const IsContinueAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "Free delivery on orders above Rs.500. Same Day Delivery on orders placed till 6:00pm",
		prodType: "",
		orderType: "",
		city: "Karachi",
	});
	const [toState, setToState] = useState(true);
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
		const { baseUrl, headers } = getGeneralApiParams();
		var encodedText = encodeURI(text);
		await isContinueUpdateApi(
			baseUrl,
			prodType,
			orderType,
			city,
			encodedText,
			headers
		).then((response) => alert(response.data.message));
	};
	return (
		<div>
			<CustomInput
				position={"top"}
				type={"text"}
				value={text}
				onChange={handleText}
				required={true}
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

export default IsContinueAPIComponent;
