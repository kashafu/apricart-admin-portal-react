import React, { useState } from "react";

import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { isContinueUpdateApi } from "../../../utils/ApiCalls";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const IsContinueAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "Free delivery on orders above Rs.500. Same Day Delivery on orders placed till 6:00pm",
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
		var encodedText = encodeURI(text);

		await isContinueUpdateApi(
			baseUrl,
			prodType,
			orderType,
			city,
			encodedText,
			headers
		).then((response) => {
			checkStatus(response, "isContinue text Updated");
		});
	};
	return (
		<div>
			<Heading>Is Continue API</Heading>
			<CustomInput
				heading={"Enter Text"}
				position={"top"}
				type={"text"}
				value={text}
				onChange={handleText}
				required={true}
			/>
			<CustomSelectInput
				onChange={(e) => handleProdType(e)}
				heading={"Select Product Type"}
				values={["cus", "b2b"]}
				options={["Customer (cus)", "Bulk Buy (b2b)"]}
			/>
			<CustomSelectInput
				onChange={(e) => handleOrderType(e)}
				heading={"Select Order Type"}
				values={["delivery", "pickup"]}
				options={["Delivery", "Pick up"]}
			/>
			<CustomSelectInput
				position={"bottom"}
				onChange={(e) => handleCity(e)}
				heading={"Select City"}
				values={["karachi", "peshawar"]}
				options={["Karachi", "Peshawar"]}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/4"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default IsContinueAPIComponent;
