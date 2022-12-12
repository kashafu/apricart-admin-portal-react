import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";
import { getAllBannersApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import EachBannerRenderComponent from "./EachBannerRenderComponent";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const BannersAPIComponent = () => {
	const [banners, setBanners] = useState([]);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
		prodType: "cus",
		orderType: "delivery",
		city: "karachi",
	});
	const { prodType, orderType, city } = inputs;
	const router = useRouter();

	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};

	const fetchBannerData = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllBannersApi(baseUrl, prodType, orderType, city, headers).then(
			(response) => {
				let status = checkStatus(response);
				status && setBanners(response.data.data);
				setLoading(false);
			}
		);
	};

	const handleAddBanner = () => {
		router.push("/offer/banners/save");
	};

	useEffect(() => {
		fetchBannerData();
	}, [inputs]);

	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Banners</Heading> */}
			<form className="grid grid-cols-2 pt-6">
				<CustomSelectInput
					position={"top"}
					onChange={(e) => handleProdType(e)}
					heading={"Select Product Type"}
					values={["cus", "b2b"]}
					options={["Customer", "Bulk Buy"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleOrderType(e)}
					heading={"Select Order Type"}
					values={["delivery", "pickup"]}
					options={["Delivery", "Pick up"]}
				/>
				<CustomSelectInput
					position={"bottom"}
					onChange={(e) => handleCity(e)}
					heading={"Select City"}
					values={["karachi", "peshawar"]}
					options={["Karachi", "Peshawar"]}
				/>
			</form>
			<div className="divide-y-[1px] divide-main-blue">
				{banners.length > 0 ? (
					banners?.map((banner) => (
						<div key={banner.id}>
							<EachBannerRenderComponent props={banner} />
						</div>
					))
				) : (
					<h3 className="text-center py-4">No Banners</h3>
				)}
			</div>
			<CustomButton onClick={handleAddBanner} width="1/3">
				Add a Banner
			</CustomButton>
		</section>
	);
};

export default BannersAPIComponent;
