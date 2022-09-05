import React, { useState } from "react";

import CustomInput from "../../Misc/CustomInput";
import FormData from "form-data";

import {
	saveBannersApi,
	updateCategoryBannerApi,
	updateCategoryImageApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";

const UpdateCategoryImageAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		categoryId: 0,
	});
	const { bannerUrlApp, categoryId } = input;

	const handleAppImage = (e) => {
		const { files } = e.target;
		setInput({ ...input, bannerUrlApp: [files[0]] });
	};

	const handleCategoryId = (e) => {
		setInput({ ...input, categoryId: e.target.value });
	};

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp[0]);
		bannerData.append("category_id", categoryId);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl } = getGeneralApiParams();
		await fillFormData();
		await updateCategoryImageApi(baseUrl, bannerData).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	};
	return (
		<section className="relative">
			{<Loading loading={loading} />}
			<form action="" method="POST">
				<CustomInput
					type={"number"}
					onChange={(e) => handleCategoryId(e)}
					placeholder={"Category ID"}
					value={categoryId}
				/>
				<div>
					<label htmlFor="img" className="m-4">
						Upload New Category Image
					</label>
					<input
						name="img"
						type={"file"}
						required
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={(e) => handleAppImage(e)}
					/>
				</div>
				<div>
					<CustomButton onClick={(e) => submitHandler(e)} width={"1/3"}>
						Update Category Image
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default UpdateCategoryImageAPIComponent;
