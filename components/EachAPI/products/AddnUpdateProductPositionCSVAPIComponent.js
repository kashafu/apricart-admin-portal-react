import React, { useState } from "react";

import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
} from "../../../utils/GeneralVariables";
import FormData from "form-data";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";

import {
	addUpdateProductCSVApi,
	updateProductPositionCSVApi,
} from "../../../utils/ApiCalls";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";

const AddnUpdateProductPositionCSVAPIComponent = () => {
	const [apiToken, setApiToken] = useState("");
	const [csv, setCsv] = useState();
	const [ren, setRen] = useState("");
	const [loading, setLoading] = useState(false);
	var file = new FormData();

	// updating the ren state causes the input tag to re render and delete whatever file was given to it
	// ren given as key to input
	const handleApiToken = (e) => {
		setApiToken(e.target.value);
	};
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
		await addUpdateProductCSVApi(baseUrl, apiToken, file, headers).then(
			(response) => {
				checkStatus(response, "File Upload Successful");
				setLoading(false);
			}
		);
	};
	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Product Position CSV</Heading> */}
			<form>
				<section className="grid grid-cols-2 pt-6">
					{/* <CustomInput
						heading={"Enter API Token"}
						value={apiToken}
						onChange={(e) => handleApiToken(e)}
						position={"top"}
						placeholder={"API Token"}
					/> */}
					<CustomSingleImageInput
						heading={"Select Updated File"}
						accept={".csv"}
						onChange={(e) => {
							handleFile(e);
						}}
						ren={ren}
					/>
					<CustomButton onClick={handleSubmit} width={"1/3"}>
						Save
					</CustomButton>
					{/* <div>
						<label className="appearance-none rounded-none relative block w-full px-3 py-2 border border-b-0 border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark">
							Select Updated File
						</label>
						<input
							type={"file"}
							accept={".csv"}
							key={ren || ""}
							onChange={(e) => handleFile(e)}
							required={true}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black border-t-0 text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
						/>
					</div> */}
				</section>
			</form>
		</section>
	);
};

export default AddnUpdateProductPositionCSVAPIComponent;
