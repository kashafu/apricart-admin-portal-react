import React, { useState } from "react";

import { webUpdateApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const WebUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "APR-PT36-02,APR-LM03-03,APR-MP02-02,APR-OL12-01,APRA-OB03-04,APRA-OB10-11,APRA-OB06-01,APRA-OB08-01,APRA-BF11-01,APRA-OB43-03,APR-T07-00,APRA-OB05-01",
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

		await webUpdateApi(baseUrl, prodType, orderType, city, text, headers).then(
			(response) => {
				setLoading(false);
				checkStatus(response);
			}
		);
	};

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Update Web</Heading>
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
		</section>
	);
};

export default WebUpdateAPIComponent;
