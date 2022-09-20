import React, { useState } from "react";

import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import CustomInput from "../../Misc/CustomInput";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { sendNotificationApi } from "../../../utils/ApiCalls";
import Heading from "../../Misc/Heading";

const NewNotificationSendAPIComponent = () => {
	const [inputs, setInputs] = useState({
		type: "offer",
		value: 0,
		title: "Staging- Notificacione nuevo",
		message: "Lo Siento Senor",
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
		e.preventDefault();
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
		).then((response) => {
			checkStatus(response, "Notification Sent Successfully");
		});
	};
	return (
		<div className="font-nunito">
			<Heading>Send Notification</Heading>
			<form action="" method="POST">
				<CustomInput
					heading={"Offer"}
					position={"top"}
					type={"text"}
					value={type}
					onChange={handleOffer}
					required={true}
					placeholder={"Offer"}
				/>
				<CustomInput
					heading={"Value"}
					type={"number"}
					value={value}
					onChange={handleValue}
					required={true}
					min={0}
					placeholder={"Value"}
				/>
				<CustomInput
					heading={"Title"}
					type={"text"}
					value={title}
					onChange={handleTitle}
					required={true}
					placeholder={"Title"}
				/>
				<CustomInput
					heading={"Message"}
					type={"text"}
					value={message}
					onChange={handleMessage}
					required={true}
					placeholder={"Message"}
				/>
				<CustomSelectInput
					onChange={handleTo}
					options={["All Devices", "Individual Recipient"]}
					values={["alldev", ""]}
					heading={"Select Recipient Type"}
				/>
				{toState && (
					<CustomInput
						heading={"Enter City"}
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
						heading={"Enter Recipient"}
						position={"bottom"}
						type={"text"}
						value={to}
						onChange={handleTo}
						required={true}
						placeholder={"Send To Who"}
					/>
				)}
				<CustomButton width={"1/3"} onClick={handleSubmit} type={"submit"}>
					Send Notification
				</CustomButton>
			</form>
		</div>
	);
};

export default NewNotificationSendAPIComponent;
