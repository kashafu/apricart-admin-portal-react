import React, { useState } from "react";

import FormData from "form-data";
import { updateProductCSVApi } from "../../../utils/ApiCalls";
import CustomInput from "../../Misc/CustomInput";
import CustomButton from "../../Misc/CustomButton";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";

const UpdateProductCSVAPIComponent = () => {
	const [csv, setCsv] = useState();
	const [ren, setRen] = useState("");
	const [apiToken, setApiToken] = useState("");
	const [loading, setLoading] = useState(false);
	var file = new FormData();

	// updating the ren state causes the input tag to re render and delete whatever file was given to it
	// ren given as key to input

	const handleFile = (e) => {
		let verify = e.target.files[0];
		if (verify.type !== "text/csv") {
			setCsv();
			updateRen(setRen);
			displayErrorToast("Upload a valid CSV file", 1500, "top-left");
		} else setCsv(verify);
	};
	const handleToken = (e) => {
		setApiToken(e.target.value);
	};

	const fillFormData = () => {
		file.append("files", csv);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		fillFormData();
		const { baseUrl, headers } = getGeneralApiParams();
		// if (file.entries().next())
		await updateProductCSVApi(baseUrl, file, headers).then((response) => {
			setLoading(false);
			checkStatus(response, "File Upload Successful");
		});
	};
	return (
		<section className="px-10">
			<Loading loading={loading} />
			<section>
				<form action="" method="POST">
					<section className="grid grid-cols-2 pt-6 ">
						{/* <CustomInput
							type={"text"}
							position={"top"}
							onChange={handleToken}
							heading={"API Token"}
							required={true}
						/> */}
						<CustomSingleImageInput
							heading={"Select File"}
							accept={".csv"}
							onChange={(e) => {
								handleFile(e);
							}}
							ren={ren}
						/>
						<CustomButton onClick={handleSubmit} width={"1/3"}>
							Save
						</CustomButton>
					</section>
				</form>
			</section>
		</section>
	);
};

export default UpdateProductCSVAPIComponent;
