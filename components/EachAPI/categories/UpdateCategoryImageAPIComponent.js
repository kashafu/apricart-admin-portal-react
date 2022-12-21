import React, { useEffect, useState } from "react";

import CustomInput from "../../Misc/CustomInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import Heading from "../../Misc/Heading";
import FormData from "form-data";
import {
	getAllCategoriesApi,
	updateCategoryImageApi,
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
import CustomSelectInput from "../../Misc/CustomSelectInput";

const UpdateCategoryImageAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
	const [categories, setCategories] = useState([]);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		categoryId: "",
	});
	const { bannerUrlApp, categoryId } = input;

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

	const fetchCategoryIds = async () => {
		const { baseUrl } = getGeneralApiParams();
		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			setInput({ ...input, categoryId: response.data.data[0].id });
			let status = checkStatus(response, "");
			status && setCategories(response.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		fetchCategoryIds();
	}, []);

	return (
		<section className="px-10">
			{<Loading loading={loading} />}
			{/* <Heading>Category Image Update</Heading> */}
			<form action="" method="POST">
				<section className="grid grid-cols-2 pt-6">
					{/* <CustomInput
						heading={"Enter Category Id"}
						type={"number"}
						onChange={(e) => handleCategoryId(e)}
						placeholder={"Category ID"}
						value={categoryId}
					/> */}
					<CustomSelectInput
						onChange={(e) => handleCategoryId(e)}
						heading={"Select Category"}
						values={categories.map((each) => each.id)}
						options={categories.map((each) => each.name)}
					/>
					<CustomSingleImageInput
						heading={"Upload New Category Image"}
						ren={ren}
						onChange={handleAppImage}
					/>
				</section>
				<div>
					<CustomButton onClick={(e) => submitHandler(e)} width={"1/3"}>
						Update
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default UpdateCategoryImageAPIComponent;
