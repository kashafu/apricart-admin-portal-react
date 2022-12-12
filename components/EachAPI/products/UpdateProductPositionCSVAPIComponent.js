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
import CustomInput from "../../Misc/CustomInput";
import { updateProductPositionCSVApi } from "../../../utils/ApiCalls";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";

const UpdateProductPositionCSVAPIComponent = () => {
	const [csv, setCsv] = useState();
	const [ren, setRen] = useState("");
	const [loading, setLoading] = useState(false);
	var file = new FormData();

	// updating the ren state causes the input tag to re render and delete whatever file was given to it
	// ren given as key to input

	const handleFile = (e) => {
		let verify = e.target.files[0];
		if (verify.type !== "text/csv") {
			setCsv();
			updateRen(setRen);
			displayErrorToast("Only Upload CSV files", 1500);
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
		await updateProductPositionCSVApi(baseUrl, file, headers).then(
			(response) => {
				setLoading(false);
				checkStatus(response, "Successfully Submitted updated CSV file");
			}
		);
	};
	return (
		<section className="px-10">
			<Loading loading={loading} />
			<form action="" method="POST" className="grid grid-cols-2">
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
			</form>
		</section>
	);
};

export default UpdateProductPositionCSVAPIComponent;
