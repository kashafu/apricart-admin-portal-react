import FormData from "form-data";
import React, { useState } from "react";

import { uploadImagesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	validateImage,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomImageInput from "../../Misc/CustomImageInput";

const ImageUploadAPIComponent = () => {
	var images = new FormData();
	const [loading, setLoading] = useState(false);
	const [imageInput, setImageInput] = useState([
		{
			img: "",
		},
	]);

	const handleChangeValue = (e, index) => {
		const { name, files } = e.target;
		const list = [...imageInput];
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			list[index][name] = files[0];
			setImageInput(list);
		} else {
			displayErrorToast(
				"Upload a valid image. eg. .jpg, .jpeg, .png, .gif",
				1500,
				"top-left"
			);
		}
	};

	const handleInputRemove = (index) => {
		const list = [...imageInput];
		list.splice(index, 1);
		setImageInput(list);
	};

	const handleInputAdd = () => {
		setImageInput([...imageInput, { img: "" }]);
	};

	const fillFormData = () => {
		console.log(imageInput);
		imageInput.forEach((each) => {
			images.append("files", each);
		});
		images.append("primary", false);
	};

	const checkEmpty = () => {
		let entries = images.entries().next();

		const { value } = entries;

		for (let i = 1; i < value.length; i++) {
			if (i % 2 !== 0) {
				if (value[i] === "") return true;
			}
		}
	};

	const submitHandler = async () => {
		setLoading(true);
		fillFormData();
		const { baseUrl } = getGeneralApiParams();

		let entries = images.entries().next();

		await uploadImagesApi(baseUrl, images).then((response) => {
			console.log(response);
			checkStatus(response);
		});

		setLoading(false);
	};

	return (
		<section className="pl-10">
			{<Loading loading={loading} />}
			<section className="grid grid-cols-2 gap-2">
				<form action="" method="POST">
					{imageInput.map((each, index) => (
						<div key={index} className="ml-20">
							<CustomImageInput
								handleChangeValue={handleChangeValue}
								index={index}
							/>
							{imageInput.length - 1 === index && imageInput.length && (
								<button
									type="button"
									className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue my-2"
									onClick={handleInputAdd}
								>
									<span>Add another Image</span>
								</button>
							)}
							<div className="">
								{imageInput.length !== 1 && (
									<button
										type="button"
										className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue my-2"
										onClick={() => handleInputRemove(index)}
									>
										<span>Remove</span>
									</button>
								)}
							</div>
						</div>
					))}
				</form>
			</section>
			{/* <button onClick={submitHandler} className="">Submit Images</button> */}
			<button
				type="submit"
				onClick={(e) => submitHandler(e)}
				className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
			>
				Submit Images
			</button>
		</section>
	);
};

export default ImageUploadAPIComponent;
