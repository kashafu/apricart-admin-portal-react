import React, { useState } from "react";

import { recommendedUpdateApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

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
		<div className="font-nunito">
			<Heading>Update Recommended</Heading>
			<CustomInput
				position={"top"}
				type={"text"}
				value={text}
				onChange={handleText}
				required={true}
				heading={"Enter SKU's comma separated"}
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
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default RecommendedUpdateAPIComponent;
