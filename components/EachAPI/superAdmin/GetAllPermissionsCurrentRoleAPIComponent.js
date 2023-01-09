import { useState } from "react";

import { getCurrentRolePermissionsDetailsApi } from "../../../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables";
import SingleAPILayout from "../../Layouts/SingleAPILayout";

const GetAllPermissionsCurrentRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getCurrentRolePermissionsDetailsApi(baseUrl, headers).then(
			(response) => {
				let status = checkStatus(response);
				status && setDetails(response.data.data);
				setLoading(false);
			}
		);
	}

	return (
		<>
			<SingleAPILayout
				heading={"Get All Permissions for your Role"}
				loading={loading}
				buttonOnClick={(e) => handleSubmit(e)}
				buttonText={"Get All Permissions for your Role"}
			/>
			<div>
				{details?.map((each) => (
					<section key={each.id} className="flex my-4 mb-4">
						<div className="px-4 text-xl font-semibold font-lato">{each.id}</div>
						<div className="px-8 font-nunito font-bold">
							<div>API Name</div>
							<div>API Endpoint</div>
							<div>Active</div>
						</div>
						<div className="px-8 font-nunito">
							<div>{each.permission.apiName}</div>
							<div>{each.permission.apiURL}</div>
							<div>{each.permission.active}</div>
						</div>
					</section>
				))}
			</div>
		</>
	)
}

export default GetAllPermissionsCurrentRoleAPIComponent