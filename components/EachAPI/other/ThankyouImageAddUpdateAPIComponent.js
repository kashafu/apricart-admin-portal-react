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
	const handleImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, thanksImage: verify });
		} else {
			setInput({ ...input, thanksImage: "" });
			updateRen(setRen);
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
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Thank You Page Banner Update</Heading> */}
			<form action="" method="POST">
				<section className="grid grid-cols-2 pt-6">
					<CustomSelectInput
						position={"top"}
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
						onChange={(e) => handleCity(e)}
						heading={"Select City"}
						values={["karachi", "peshawar"]}
						options={["Karachi", "Peshawar"]}
					/>
					<CustomSingleImageInput
						position={"bottom"}
						heading={"Upload New Thank You Image"}
						onChange={(e) => {
							handleImage(e);
						}}
						ren={ren}
					/>
				</section>
				<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
					Update
				</CustomButton>
			</form>
		</section>
	);
};

export default ThankyouImageAddUpdateAPIComponent;
