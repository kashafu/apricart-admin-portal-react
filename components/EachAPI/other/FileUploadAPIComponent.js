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
import CustomFileInput from "../../Misc/CustomFileInput";

const FileUploadAPIComponent = () => {
	var files = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
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
			updateRen(setRen);
			displayErrorToast(
				"Upload a valid file. eg. .pdf, .csv, .mp4",
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
			<section className="grid grid-cols-2 gap-2">
				<form action="" method="POST">
					{imageInput?.map((each, index) => (
						<div key={index} className="ml-20">
							<CustomFileInput
								handleChangeValue={handleChangeValue}
								index={index}
							/>
							{imageInput.length - 1 === index && imageInput.length && (
								<button
									type="button"
									className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue my-2"
									onClick={handleInputAdd}
								>
									<span>Add another File</span>
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
			{/* <button onClick={submitHandler} className="">Submit files</button> */}
			<button
				type="submit"
				onClick={(e) => submitHandler(e)}
				className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
			>
				Submit Files
			</button>
		</div>
	);
};

export default FileUploadAPIComponent;
