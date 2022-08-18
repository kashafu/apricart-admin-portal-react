import React, { useState, useEffect } from "react";
import { getAllBannersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import EachBannerRenderComponent from "./EachBannerRenderComponent";

const BannersAPIComponent = () => {
	const [banners, setBanners] = useState([
		{
			id: "01",
		},
	]);

	const fetchBannerData = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllBannersApi(baseUrl, headers).then((response) => {
			setBanners(response.data.data);
		});
	};

	useEffect(() => {
		fetchBannerData();
	}, []);

	return (
		<div>
			{banners?.map((banner) => (
				<div key={banner.id}>
					<EachBannerRenderComponent props={banner} />
				</div>
			))}
		</div>
	);
};

export default BannersAPIComponent;
