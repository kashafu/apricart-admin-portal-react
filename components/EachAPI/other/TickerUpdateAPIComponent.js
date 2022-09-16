import React, { useState } from "react";

import { updateTickerApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

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

		await updateTickerApi(
			baseUrl,
			text,
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
			<Heading>Update Ticker Text</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					position={"top"}
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
					onChange={(e) => handleCity(e)}
					heading={"Select City"}
					values={["karachi", "peshawar"]}
					options={["Karachi", "Peshawar"]}
				/>
				<div className="grid grid-cols-5 pr-2">
					<div className="col-span-1">
						<p className="ml-2 font-nunito">Enter Ticker Text</p>
					</div>
					<textarea
						className="bg-gray-100 w-full h-56 p-1 col-span-3 placeholder:text-gray-500 border-[1px] border-black rounded-b-xl"
						required
						placeholder="eg. Hello Customers Avail 10% off on all categories etc."
						onChange={(e) => handleText(e)}
						name="ticker"
						cols="30"
						rows="10"
						maxLength={140}
						value={text}
					/>
				</div>
				<CustomButton onClick={(e) => submitHandler(e)} width="1/3">
					Update Ticker
				</CustomButton>
			</form>
		</section>
	);
};

export default TickerUpdateAPIComponent;
