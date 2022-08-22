import React, { useState } from "react";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const NewNotificationSendAPIComponent = () => {
	const [inputs, setInputs] = useState({
		type: "offer",
		value: 0,
		title: "Staging: Customers of Fleet Street",
		message: "Sweeney Todd is back in town",
		city: "Karachi",
	});
	const { type, value, title, message, city } = inputs;

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

	return (
		<div>
			<form action="" method="POST">
				<CustomInput
					position={"top"}
					type={"text"}
					value={type}
					onChange={handleOffer}
				/>
				<CustomInput
					type={"number"}
					value={value}
					onChange={handleValue}
					min={0}
				/>
				<CustomInput type={"text"} value={title} onChange={handleTitle} />
				<CustomInput type={"text"} value={message} onChange={handleMessage} />
				<CustomInput
					position={"bottom"}
					type={"text"}
					value={city}
					onChange={handleCity}
				/>
				<CustomButton width={"96"}>Send Notification</CustomButton>
			</form>
		</div>
	);
};

export default NewNotificationSendAPIComponent;
