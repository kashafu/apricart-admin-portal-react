import React, { useState } from "react";

import FormData from "form-data";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	validateImage,
} from "../../../utils/GeneralVariables";
import { updateThankYouImageApi } from "../../../utils/ApiCalls";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import Heading from "../../Misc/Heading";

const ThankyouImageAddUpdateAPIComponent = () => {
	var thankyou = new FormData();
	var allowedTypes = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
	const [input, setInput] = useState({
		thanksImage: "",
		prodType: "cus",
		orderType: "delivery",
		city: "karachi",
	});
	const { prodType, thanksImage, orderType, city } = input;
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
	const handleThanksImage = (e) => {
		const { files } = e.target;
		let verify = e.target.files[0];
		if (allowedTypes.includes(verify.type)) {
			setInput({ ...input, thanksImage: [files[0]] });
		} else {
			setInput({ ...input, thanksImage: "" });
			updateRen();
			displayErrorToast("Upload a valid image file", 1500, "top-left");
		}
	};
	const handleImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, thanksImage: verify });
		} else {
			setInput({ ...input, thanksImage: "" });
			updateRen();
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};
	const updateRen = () => {
		setRen(Math.random().toString(36));
	};
	const fillFormData = () => {
		thankyou.append("thankyou_image", thanksImage);
		thankyou.append("prod_type", prodType);
		thankyou.append("order_type", orderType);
		thankyou.append("city", city);
	};

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl } = getGeneralApiParams();
		await fillFormData();
		await updateThankYouImageApi(baseUrl, thankyou).then((response) => {
			checkStatus(response);
			setLoading(false);
		});
	};
	return (
		<section>
			<Heading>Update Thank You Image</Heading>
			{<Loading loading={loading} />}
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
				<div>
					<CustomSingleImageInput
						position={"bottom"}
						heading={"Upload New Thank You Image"}
						onChange={(e) => {
							handleImage(e);
						}}
						ren={ren}
					/>
					<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
						Update Thank you Image
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default ThankyouImageAddUpdateAPIComponent;
