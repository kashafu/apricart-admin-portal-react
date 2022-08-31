import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import { getAllBannersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import EachBannerRenderComponent from "./EachBannerRenderComponent";
const BannersAPIComponent = () => {
	const [banners, setBanners] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const checkStatus = (res) => {
		if (res.status === 200) setBanners(res.data.data);
		else if (res.status !== 200)
			toast.error(res.data.message, {
				position: "top-center",
				autoClose: 1800,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: "errorId",
			});
	};

	const fetchBannerData = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllBannersApi(baseUrl, headers).then((response) => {
			checkStatus(response);
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
