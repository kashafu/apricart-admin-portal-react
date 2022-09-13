import React, { useState } from "react";

import FormData from "form-data";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { updateThankYouImageApi } from "../../../utils/ApiCalls";
import CustomButton from "../../Misc/CustomButton";

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
			{<Loading loading={loading} />}
			<form action="" method="POST">
				<select
					onChange={(e) => {
						setInput({ ...input, prodType: e.target.value });
					}}
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark rounded-t-lg"
				>
					<option value="cus">cus</option>
					<option value="b2b">b2b</option>
				</select>
				<select
					onChange={(e) => {
						setInput({ ...input, orderType: e.target.value });
					}}
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark "
				>
					<option value="delivery">delivery</option>
					<option value="pickup">pickup</option>
				</select>
				<select
					onChange={(e) => {
						setInput({ ...input, city: e.target.value });
					}}
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark rounded-b-lg"
				>
					<option value="karachi">Karachi</option>
					<option value="peshawar">Peshawar</option>
				</select>
				<div>
					<label htmlFor="img" className="m-4">
						Upload Image
					</label>
					<input
						name="img"
						type={"file"}
						required
						key={ren || ""}
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={(e) => handleThanksImage(e)}
					/>
				</div>
				<div>
					<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
						Update Thank you Image
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default ThankyouImageAddUpdateAPIComponent;
