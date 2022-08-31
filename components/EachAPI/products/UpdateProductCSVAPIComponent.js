import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormData from "form-data";
import { updateProductCSVApi } from "../../../utils/ApiCalls";
import CustomInput from "../../Misc/CustomInput";
import CustomButton from "../../Misc/CustomButton";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";

const UpdateProductCSVAPIComponent = () => {
	const [csv, setCsv] = useState();
	const [ren, setRen] = useState("");
	const [apiToken, setApiToken] = useState("");
	const [loading, setLoading] = useState(false);
	var file = new FormData();

	// updating the ren state causes the input tag to re render and delete whatever file was given to it
	// ren given as key to input
	const updateRen = () => {
		setRen(Math.random().toString(36));
	};
	const handleFile = (e) => {
		let verify = e.target.files[0];
		if (verify.type !== "text/csv") {
			setCsv();
			updateRen();
			toast.error("Upload a valid CSV file", {
				position: "top-left",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: ren,
			});
		} else setCsv(verify);
	};
	const handleToken = (e) => {
		setApiToken(e.target.value);
	};

	const fillFormData = () => {
		file.append("files", csv);
	};

	const checkStatus = (res) => {
		console.log(res);
		if (res.status === 200) {
			toast.success("File Uploaded", {
				position: "top-left",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: ren,
			});
		} else {
			toast.error(res.data.message, {
				position: "top-left",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: ren,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		fillFormData();
		const { baseUrl, headers } = getGeneralApiParams();
		// if (file.entries().next())
		await updateProductCSVApi(baseUrl, apiToken, file, headers).then(
			(response) => {
				setLoading(false);
				checkStatus(response);
			}
		);
	};
	return (
		<>
			<Loading loading={loading} />
			<section>
				<form action="" method="POST">
					<CustomInput
						type={"text"}
						position={"top"}
						onChange={handleToken}
						placeholder={"API Token"}
						required={true}
					/>
					<label className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-b-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark">
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
					<CustomButton onClick={handleSubmit}>
						Submit Updated File
					</CustomButton>
				</form>
			</section>
		</>
	);
};

export default UpdateProductCSVAPIComponent;
