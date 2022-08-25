import React, { useState } from "react";
import { sendNotificationApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const NewNotificationSendAPIComponent = () => {
	const [inputs, setInputs] = useState({
		type: "offer",
		value: 0,
		title: "Staging- Customers of Fleet Street",
		message: "Sweeney Todd is back in town",
		city: "karachi",
		to: "alldev",
	});
	const [toState, setToState] = useState(true);
	const { type, value, title, message, city, to } = inputs;

	const handleOffer = (e) => {
		setInputs({ ...inputs, type: e.target.value });
	};
	const handleValue = (e) => {
		setInputs({ ...inputs, value: e.target.value });
	};
	const handleTitle = (e) => {
		setInputs({ ...inputs, title: e.target.value });
	};
	const handleMessage = (e) => {
		setInputs({ ...inputs, message: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const handleTo = (e) => {
		if (e.target.value !== "alldev") {
			setToState(false);
			setInputs({ ...inputs, city: "" });
		} else {
			setToState(true);
		}
		setInputs({ ...inputs, to: e.target.value });
	};
	const handleSubmit = async (e) => {
		const { baseUrl, headers } = getGeneralApiParams();
		var encodedType = encodeURI(type);
		var encodedMessage = encodeURI(message);
		await sendNotificationApi(
			baseUrl,
			type,
			value,
			encodedType,
			encodedMessage,
			city,
			to,
			headers
		).then((response) => console.log(response));
	};
	return (
		<div>
			<form action="" method="POST">
				<CustomInput
					position={"top"}
					type={"text"}
					value={type}
					onChange={handleOffer}
					required={true}
					placeholder={"Offer"}
				/>
				<CustomInput
					type={"number"}
					value={value}
					onChange={handleValue}
					required={true}
					min={0}
					placeholder={"Value"}
				/>
				<CustomInput
					type={"text"}
					value={title}
					onChange={handleTitle}
					required={true}
					placeholder={"Title"}
				/>
				<CustomInput
					type={"text"}
					value={message}
					onChange={handleMessage}
					required={true}
					placeholder={"Message"}
				/>
				<select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					onChange={(e) => handleTo(e)}
					required={true}
				>
					<option value="alldev">All Devices</option>
					<option value="">Individual</option>
				</select>

				{toState && (
					<CustomInput
						position={"bottom"}
						type={"text"}
						value={city}
						onChange={handleCity}
						required={true}
						placeholder={"City"}
					/>
				)}
				{!toState && (
					<CustomInput
						position={"bottom"}
						type={"text"}
						value={to}
						onChange={handleTo}
						required={true}
						placeholder={"Send To Who"}
					/>
				)}
				<CustomButton width={"1/5"} onClick={handleSubmit} type={"submit"}>
					Send Notification
				</CustomButton>
			</form>
		</div>
	);
};

export default NewNotificationSendAPIComponent;
