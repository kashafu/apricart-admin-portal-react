import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadAbundantCartApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";

const GetAbundantCartReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [horas, setHoras] = useState(5);
	const [disabler, setDisabler] = useState(false);

	const fetchReport = async (e) => {
		setDisabler(true);
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await downloadAbundantCartApi(baseUrl, horas, headers).then(() => {
			setLoading(false);
			toast.info(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: "XD",
				}
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};

	return (
		<section>
			<form>
				<Loading loading={loading} />
				<label>Enter Hours</label>
				<br />
				<input
					className="bg-gray-100 font-bold border-[1px] border-main-blue"
					type="number"
					value={horas}
					onChange={(e) => setHoras(e.target.value)}
				/>
				<br />
				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
					position={"left"}
				>
					Download Abundant Cart Report
				</CustomButton>
			</form>
		</section>
	);
};

export default GetAbundantCartReportsAPIComponent;
