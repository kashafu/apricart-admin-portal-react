import React from "react";
import { useState } from "react";
import { productImageUpdateApi } from "../../../utils/ApiCalls";
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
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";

const UploadProductImageAPIComponent = () => {
	var data = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
	const [input, setInput] = useState({
		file,
		primary: true,
	});
	const { file, primary } = input;

	const handleImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, file: verify });
		} else {
			setInput({ ...input, file: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};

	const handlePrimary = (e) => {
		setInput({ ...input, primary: e.target.value });
	};

	const fillFormData = () => {
		data.append("files", file);
		data.append("primary", primary);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await fillFormData();
		await productImageUpdateApi(baseUrl, data, headers).then((response) => {
			checkStatus(response, "Image Updated Successfully");
			setLoading(false);
		});
	};

	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Product Position CSV</Heading> */}
			<form>
				<section className="grid grid-cols-2 pt-6">
					<CustomSelectInput
						onChange={(e) => handlePrimary(e)}
						heading={"Select Primary"}
						values={["true", "false"]}
						options={["True", "False"]}
					/>
					<CustomSingleImageInput
						heading={"Upload New Image"}
						ren={ren}
						onChange={handleImage}
					/>
				</section>
				<CustomButton onClick={handleSubmit} width={"1/3"}>
					Save
				</CustomButton>
			</form>
		</section>
	);
};

export default UploadProductImageAPIComponent;
