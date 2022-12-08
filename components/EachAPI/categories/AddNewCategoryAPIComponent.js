import React, { useState } from "react";
import FormData from "form-data";

import { addCategoryApi, updateCategoryApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	validateImage,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";
import CustomFloatingInputNew from "../../Misc/CustomFloatingInputNew";

const AddNewCategoryAPIComponent = () => {
	var categoryData = new FormData();
	const [ren, setRen] = useState("");
	const [inputs, setInputs] = useState({
		name: "",
		position: "",
		parentId: "",
		categoryImage: "",
	});
	const [loading, setLoading] = useState(false);
	const { name, position, parentId, categoryImage } = inputs;

	const handleName = (e) => {
		setInputs({ ...inputs, name: e.target.value });
	};
	const handlePosition = (e) => {
		setInputs({ ...inputs, position: e.target.value });
	};
	const handleParentId = (e) => {
		setInputs({ ...inputs, parentId: e.target.value });
	};
	const updateRen = () => {
		setRen(Math.random().toString(36));
	};
	const handleImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInputs({ ...inputs, categoryImage: verify });
		} else {
			setInputs({ ...inputs, categoryImage: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};
	const fillFormData = () => {
		categoryData.append("category_image", categoryImage);
		categoryData.append("parent_id", parentId);
		categoryData.append("name", name);
		categoryData.append("position", position);
	};
	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		fillFormData();
		await addCategoryApi(baseUrl, categoryData, headers).then((response) => {
			checkStatus(response);
			setLoading(false);
		});
	};

	return (
		<section className="relative px-10 pt-6">
			<Loading loading={loading} />
			{/* <Heading>Create a new Category</Heading> */}
			<form action="" method="POST">
				{/* <section>
					<div className="grid grid-cols-2">
						<CustomFloatingInputNew>Category Name</CustomFloatingInputNew>
						<CustomFloatingInputNew>Category Position</CustomFloatingInputNew>
					</div>
					<div className="grid grid-cols-2">
						<CustomFloatingInputNew>Category Parent Id</CustomFloatingInputNew>
						<CustomFloatingInputNew>Category Image</CustomFloatingInputNew>
					</div>
				</section> */}
				<section className="grid grid-cols-2">
					<CustomInput
						heading={"Category Name"}
						placeholder={"Category Name"}
						value={name}
						onChange={(e) => handleName(e)}
						position={"top"}
					/>
					<CustomInput
						type={"number"}
						min={0}
						heading={"Category Position"}
						placeholder={"Category Position eg. 5"}
						value={position}
						onChange={(e) => handlePosition(e)}
					/>

					<CustomInput
						type={"number"}
						min={0}
						placeholder={"Category's Parent Id eg. 5"}
						heading={"Category's Parent Id"}
						value={parentId}
						onChange={(e) => handleParentId(e)}
					/>
					<CustomSingleImageInput
						position={"bottom"}
						heading={"Category Image"}
						onChange={(e) => {
							handleImage(e);
						}}
						ren={ren}
					/>
				</section>
				<div>
					<CustomButton width={"1/3"} onClick={(e) => handleSubmit(e)}>
						Add Category
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default AddNewCategoryAPIComponent;
