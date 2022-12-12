import React, { useState } from "react";

import { downloadAbundantCartApi } from "../../../utils/ApiCalls";
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";

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
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				5000
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};

	return (
		<section className="px-10">
			{/* <Heading>Abundant Cart Report</Heading> */}
			<Loading loading={loading} />
			<form className="grid grid-cols-2 pt-6">
				<CustomInput
					heading={"Enter Hours"}
					value={horas}
					type={"number"}
					onChange={(e) => {
						setHoras(e.target.value);
					}}
				/>
				<CustomButton
					onClick={(e) => fetchReport(e)}
					disabled={disabler}
					width={"1/3"}
				>
					Download
				</CustomButton>
			</form>
		</section>
	);
};

export default GetAbundantCartReportsAPIComponent;
