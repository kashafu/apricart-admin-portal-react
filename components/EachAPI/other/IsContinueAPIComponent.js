import React, { useState } from "react";

import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { isContinueUpdateApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

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
	};
	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Is Continue</Heading> */}
			<form className="grid grid-cols-2 pt-6">
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
					options={["Customer", "Bulk Buy"]}
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
			</form>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Save
			</CustomButton>
		</section>
	);
};

export default IsContinueAPIComponent;
