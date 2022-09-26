import React, { useState } from "react";

import CustomInput from "../../Misc/CustomInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import FormData from "form-data";
import { updateCategoryBannerApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const UpdateCategoryBannerAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: "",
		bannerUrlWeb: "",
		categoryId: 0,
	});
	const { bannerUrlApp, bannerUrlWeb, categoryId } = input;

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

	const handleCategoryId = (e) => {
		setInput({ ...input, categoryId: e.target.value });
	};

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp);
		bannerData.append("web", bannerUrlWeb);
		bannerData.append("category_id", categoryId);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl } = getGeneralApiParams();
		await fillFormData();
		await updateCategoryBannerApi(baseUrl, bannerData).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	};
	return (
		<section className="relative pl-10">
			<Loading loading={loading} />
			<Heading>Category Banner Update</Heading>
			<form action="" method="POST">
				<CustomInput
					type={"number"}
					position={"top"}
					onChange={(e) => handleCategoryId(e)}
					placeholder={"Category ID"}
					heading={"Category ID"}
					value={categoryId}
				/>
				<CustomSingleImageInput
					heading={"Upload Web Banner"}
					onChange={(e) => handleWebImage(e)}
					ren={ren}
				/>
				<CustomSingleImageInput
					heading={"Upload App Banner"}
					onChange={(e) => handleAppImage(e)}
					position={"bottom"}
					ren={ren}
				/>
				<div>
					<CustomButton onClick={(e) => submitHandler(e)} width={"1/3"}>
						Update Category Banner
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default UpdateCategoryBannerAPIComponent;
