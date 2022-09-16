import React, { useState } from "react";
import { productStockDetailAdminApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const ProductStockDetailAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "APRA-BD02-01",
		city: "karachi",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([]);
	const { id, city } = inputs;

	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await productStockDetailAdminApi(baseUrl, id, city, headers).then(
			(response) => {
				let status = checkStatus(response, "Product Stock Detail Fetched");
				status ? setDetail([response.data.data[0]]) : setDetail();
				setLoading(false);
			}
		);
	};
	return (
		<section>
			<Loading loading={loading} />
			<Heading>Product Stock Detail Admin</Heading>
			<CustomInput
				heading={"Enter SKU"}
				position={"top"}
				type={"text"}
				value={id}
				onChange={handleId}
				required={true}
				placeholder={"eg. APRA-0000-00"}
			/>
			<CustomSelectInput
				position={"bottom"}
				onChange={(e) => handleCity(e)}
				heading={"Select City"}
				values={["karachi", "peshawar"]}
				options={["Karachi", "Peshawar"]}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Query
			</CustomButton>

			<section>
				{detail?.map((each) => {
					return (
						<div key={each.sku} className="flex p-2">
							<div>
								<div className="font-bold font-nunito py-1">Hayatabad:</div>
								<div className="font-bold font-nunito py-1">JoharCC:</div>
								<div className="font-bold font-nunito py-1">
									KorangiB2BDarkStore:
								</div>
								<div className="font-bold font-nunito py-1">
									KorangiDarkStore:
								</div>
								<div className="font-bold font-nunito py-1">
									North Nazimabad:
								</div>
								<div className="font-bold font-nunito py-1">SKU:</div>
								<div className="font-bold font-nunito py-1">Title:</div>
							</div>
							<div className="px-4">
								<div className="py-1"> {each.hayatabad}</div>
								<div className="py-1"> {each.joharCC}</div>
								<div className="py-1"> {each.korangiB2BDarkStore}</div>
								<div className="py-1"> {each.korangiDarkStore}</div>
								<div className="py-1"> {each.northNazimabad}</div>
								<div className="py-1"> {each.sku}</div>
								<div className="py-1"> {each.title}</div>
							</div>
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default ProductStockDetailAdminAPIComponent;
