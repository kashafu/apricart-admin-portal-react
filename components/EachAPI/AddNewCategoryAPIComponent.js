import React, { useState } from "react";
import { addCategoryApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import Loading from "../../utils/Loading";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const AddNewCategoryAPIComponent = () => {
	const [inputs, setInputs] = useState({
		name: "",
		position: 1,
		parentId: "20",
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
	const handleImage = (e) => {
		const { files } = e.target;

		setInputs({ ...inputs, categoryImage: files[0] });
	};
	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await addCategoryApi(
			baseUrl,
			categoryImage,
			parentId,
			name,
			position,
			headers
		).then((response) => {
			console.log(response);
			setLoading(false);
		});
	};

	return (
		<div>
			<Loading loading={loading} />
			<form action="" method="POST">
				<CustomInput
					placeholder={"Category Name"}
					value={name}
					onChange={(e) => handleName(e)}
					position={"top"}
				/>
				<CustomInput
					placeholder={"Category Position"}
					value={position}
					onChange={(e) => handlePosition(e)}
				/>
				<CustomInput
					placeholder={"Category's Parent Id"}
					value={parentId}
					onChange={(e) => handleParentId(e)}
				/>
				<input
					placeholder="Category Image"
					name="img"
					type={"file"}
					required
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black border-t-0 text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
					accept="image/png, image/gif, image/jpeg, image/jpg"
					onChange={(e) => handleImage(e)}
				/>
				<CustomButton onClick={(e) => handleSubmit(e)}>
					Add Category
				</CustomButton>
			</form>
		</div>
	);
};

export default AddNewCategoryAPIComponent;
