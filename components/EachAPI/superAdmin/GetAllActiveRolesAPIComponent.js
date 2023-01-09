import React, { useState } from "react";
import { getActiveRolesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import SingleAPILayout from "../../Layouts/SingleAPILayout";

const GetAllActiveRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [roleArray, setRoleArray] = useState([]);

	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getActiveRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response);
			status && setRoleArray(response.data.data);
			setLoading(false);
		})
	}

	return (
		<>
			<SingleAPILayout
				heading={"Get All Active Roles"}
				loading={loading}
				buttonOnClick={(e) => handleSubmit(e)}
				buttonText={"Get All Active Roles"}
			/>
			<section>
				<div className="grid grid-cols-4 border-b-[1px] border-main-blue">
					<div></div>
					<div>ID</div>
					<div>API Name</div>
					<div>Active</div>
				</div>
				{roleArray?.map((each) => (
					<section key={each.id} className="grid grid-cols-4 border">
						<div></div>
						<div>{each.id}</div>
						<div>{each.name || "-"}</div>
						<div>{each.active}</div>

						<div className="col-span-2" />
					</section>
				))}
			</section>
		</>
	)
}

export default GetAllActiveRolesAPIComponent