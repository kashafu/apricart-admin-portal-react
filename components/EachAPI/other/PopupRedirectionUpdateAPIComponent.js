import React, { useState } from "react";

import FormData from "form-data";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
} from "../../../utils/GeneralVariables";
import { popupRedirectionUpdateApi } from "../../../utils/ApiCalls";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import CustomInput from "../../Misc/CustomInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import Heading from "../../Misc/Heading";

const PopupRedirectionUpdateAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		prodType: "cus",
		city: "karachi",
		type: "offer",
		value: 0,
	});
	const { bannerUrlApp, bannerUrlWeb, prodType, type, value, city } = input;

	const handleWebImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, bannerUrlWeb: verify });
		} else {
			setInput({ ...input, bannerUrlWeb: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};

	const handleAppImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, bannerUrlApp: verify });
		} else {
			setInput({ ...input, bannerUrlApp: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp);
		bannerData.append("web", bannerUrlWeb);
		bannerData.append("prod_type", prodType);
		bannerData.append("city", city);
		bannerData.append("type", type);
		bannerData.append("value", value);
	};
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl } = getGeneralApiParams();
		await fillFormData();
		await popupRedirectionUpdateApi(baseUrl, bannerData).then((response) => {
			checkStatus(response);
			setLoading(false);
		});
	};
	return (
		<section>
			{<Loading loading={loading} />}
			<Heading>Update Popup Redirection</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					position={"top"}
					onChange={(e) => handleProdType(e)}
					heading={"Select Product Type"}
					values={["cus", "b2b"]}
					options={["Customer (cus)", "Bulk Buy (b2b)"]}
				/>
				<CustomInput
					value={type}
					onChange={(e) => setInput({ ...input, type: e.target.value })}
					type="text"
					placeholder="Type"
					heading="Enter Type"
				/>
				<CustomInput
					value={value}
					onChange={(e) => setInput({ ...input, value: e.target.value })}
					type="number"
					placeholder="Value"
					heading="Enter Value"
				/>
				<CustomSelectInput
					onChange={(e) => handleCity(e)}
					heading={"Select City"}
					values={["karachi", "peshawar"]}
					options={["Karachi", "Peshawar"]}
				/>
				<CustomSingleImageInput
					heading={"Upload Web Banner"}
					ren={ren}
					onChange={handleWebImage}
				/>
				<CustomSingleImageInput
					position={"bottom"}
					heading={"Upload App Banner"}
					ren={ren}
					onChange={handleAppImage}
				/>

				<div>
					<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
						Update Popup Redirection
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default PopupRedirectionUpdateAPIComponent;
