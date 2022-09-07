import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import { getAllBannersApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import EachBannerRenderComponent from "./EachBannerRenderComponent";
const BannersAPIComponent = () => {
	const [banners, setBanners] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const fetchBannerData = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllBannersApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response);
			status && setBanners(response.data.data);
			setLoading(false);
		});
	};

	const handleAddBanner = () => {
		router.push("/addbanner");
	};

	useEffect(() => {
		fetchBannerData();
	}, []);

	return (
		<div>
			<Loading loading={loading} />
			{banners?.map((banner) => (
				<div key={banner.id}>
					<EachBannerRenderComponent props={banner} />
				</div>
			))}
			<CustomButton onClick={handleAddBanner} width="1/3">
				Add a Banner
			</CustomButton>
		</div>
	);
};

export default BannersAPIComponent;
