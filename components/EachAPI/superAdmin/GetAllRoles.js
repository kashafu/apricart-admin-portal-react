import React from "react";
import { getAllPermissionsApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllRoles = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllPermissionsApi(baseUrl, headers).then((response) => {
			console.log(response);
			setLoading(false);
		});
	};
	return (
		<section>
			<Loading loading={loading}></Loading>
			<Heading>Get All Permissions</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Permissions
			</CustomButton>
		</section>
	);
};

export default GetAllRoles;
