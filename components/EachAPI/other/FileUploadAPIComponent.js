import FormData from "form-data";
import React, { useState } from "react";

import { uploadFilesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateFile,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomFileInput from "../../Misc/CustomFileInput";

const FileUploadAPIComponent = () => {
	var files = new FormData();
	const [loading, setLoading] = useState(false);
	const [imageInput, setImageInput] = useState([
		{
			file: "",
		},
	]);
	// const handleChangeValue = (e, index) => {
	// 	const { name, files } = e.target;
	// 	const list = [...imageInput];
	// 	list[index][name] = files[0];
	// 	setImageInput(list);
	// };

	const handleChangeValue = (e, index) => {
		const { name, files } = e.target;
		const list = [...imageInput];
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateFile(verify);
		if (status) {
			list[index][name] = files[0];
			setImageInput(list);
		} else {
			displayErrorToast(
				"Upload a valid file. eg. .pdf, .csv, .mp4",
				1500,
				"top-left"
			);
		}
	};

	const handleInputRemove = (index, e) => {
		const list = [...imageInput];
		list.splice(index, 1);
		setImageInput(list);
		e.preventDefault();
	};

	const handleInputAdd = () => {
		setImageInput([...imageInput, { file: "" }]);
	};

	const fillFormData = () => {
		// imageInput.forEach((each) => {
		files.append("files", files);
		// });
	};

	const checkEmpty = () => {
		let entries = files.entries().next();

		const { value } = entries;

		// for (let i = 1; i < value.length; i++) {
		//
		// 	if (i % 2 !== 0) {
		// 		//
		// 		if (value[i] === "") return true;
		// 	}
		// }
	};

	const submitHandler = async () => {
		setLoading(true);
		fillFormData();
		const { baseUrl } = getGeneralApiParams();
		checkEmpty();
		// let entries = files.entries().next();

		await uploadFilesApi(baseUrl, files).then((response) => {
			checkStatus(response);
		});

		setLoading(false);
	};

	return (
		<div className="pl-10">
			{<Loading loading={loading} />}
			<section className="grid grid-cols-1 bg-green-300">
				<form action="" method="POST">
					{imageInput?.map((each, index) => (
						<div key={index} className="ml-20">
							<CustomFileInput
								handleChangeValue={handleChangeValue}
								index={index}
							/>
							{imageInput.length - 1 === index && imageInput.length && (
								<CustomButton onClick={handleInputAdd} width={"1/3"}>
									Add another File
								</CustomButton>
							)}
							<div className="">
								{imageInput.length !== 1 && (
									<CustomButton
										onClick={(e) => handleInputRemove(index, e)}
										width={"1/3"}
									>
										Remove
									</CustomButton>
								)}
							</div>
						</div>
					))}
				</form>
			</section>
			<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
				Submit Files
			</CustomButton>
		</div>
	);
};

export default FileUploadAPIComponent;
