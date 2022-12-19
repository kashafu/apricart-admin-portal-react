import React, { useState } from "react";

import CustomInput from "../../Misc/CustomInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import FormData from "form-data";
import {
	updateBannersApi,
	updateCategoryBannerApi,
} from "../../../utils/ApiCalls";
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
import EachBannerRenderComponent from "./EachBannerRenderComponent";
import BannersAPIComponent from "./BannersAPIComponent";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const EditBannersAPIComponent = () => {
	// var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	// const [ren, setRen] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		id: "",
	});
	const { bannerUrlApp, bannerUrlWeb, id } = input;

	const handleWebImage = (e) => {
		setInput({ ...input, bannerUrlWeb: [e.target.value] });
	};

	const handleAppImage = (e) => {
		setInput({ ...input, bannerUrlApp: [e.target.value] });
	};

	const handleCategoryId = (e) => {
		setInput({ ...input, id: e.target.value });
	};

	// const fillFormData = () => {
	// 	bannerData.append("app", bannerUrlApp);
	// 	bannerData.append("web", bannerUrlWeb);
	// 	bannerData.append("category_id", id);
	// };

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		// await fillFormData();
		await updateBannersApi(baseUrl, input, headers).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	};
	return (
		<section className="relative px-10">
			<Heading>Edit Banner</Heading>
			<Loading loading={loading} />
			{/* <Heading>Category Banner Update</Heading> */}
			<form action="" method="POST">
				<section className="grid grid-cols-2 pt-6">
					<CustomInput
						type={"number"}
						onChange={(e) => handleCategoryId(e)}
						heading={"Category ID"}
						value={id}
					/>
					<CustomInput
						type={"text"}
						onChange={(e) => handleWebImage(e)}
						heading={"Web Banner URL"}
						value={bannerUrlWeb}
					/>
					<CustomInput
						type={"text"}
						onChange={(e) => handleAppImage(e)}
						heading={"App Banner URL"}
						value={bannerUrlApp}
					/>
				</section>
				<div>
					<CustomButton onClick={(e) => submitHandler(e)} width={"1/3"}>
						Update
					</CustomButton>
				</div>
				<div className="mt-12">
					<BannersAPIComponent />
				</div>
			</form>
		</section>
	);
};

export default EditBannersAPIComponent;
