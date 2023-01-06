import React, { useState } from "react";

import CustomInput from "../../Misc/CustomInput";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { isContinueUpdateApi } from "../../../utils/ApiCalls";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import SingleAPILayout from "../../Layouts/SingleAPILayout";

const IsContinueAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "",
		prodType: "cus",
		orderType: "delivery",
		city: "karachi",
	});
	const { text, prodType, orderType, city } = inputs;
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
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
			setLoading(false);
			checkStatus(response, "isContinue text Updated");
		});
	}

	return (
		<SingleAPILayout
			heading={"Is Continue"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Save"}
			gridItems={
				<>
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
						position={"bottom"}
						onChange={(e) => handleCity(e)}
						heading={"Select City"}
						values={["karachi", "peshawar"]}
						options={["Karachi", "Peshawar"]}
					/>
				</>
			}
		/>
	)
};

export default IsContinueAPIComponent;
