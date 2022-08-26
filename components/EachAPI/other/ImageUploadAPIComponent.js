import FormData from "form-data";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { uploadImagesApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
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
		list[index][name] = files[0];
		setImageInput(list);
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
		imageInput.forEach((each) => {
			images.append("files", each.img);
		});
	};

	const checkStatus = (response) => {
		if (response.data.status === 1) {
			toast.success("Images Saved Successfully", {
				position: "top-center",
				autoClose: 600,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
			});
		} else if (response.data.status !== 1) {
			toast.error(response.data.error, {
				position: "top-center",
				autoClose: 600,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
			});
		}
	};

	const submitHandler = async () => {
		setLoading(true);
		fillFormData();
		const { baseUrl, headers } = getGeneralApiParams();
		uploadImagesApi(baseUrl, headers).then((response) => {
			console.log(response);
			checkStatus(response);
		});
		setLoading(false);
	};

	return (
		<div>
			{<Loading loading={loading} />}
			<section className="grid grid-cols-2 gap-2">
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
			</section>
			{/* <button onClick={submitHandler} className="">Submit Images</button> */}
			<button
				type="submit"
				onClick={(e) => submitHandler(e)}
				className="group relative w-full w- flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
			>
				Submit Images
			</button>
		</div>
	);
};

export default ImageUploadAPIComponent;
