import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { deleteBannerApi } from "../../../utils/ApiCalls";
import CustomButton from "../../Misc/CustomButton";

const EachBannerRenderComponent = ({ props }) => {
	const [propState, setPropState] = useState({
		bannerUrlWeb: [
			"https://staging.apricart.pk/options/stream/classic_cleansing_deal_web_2022-06-03T23_31_08.510417.jpeg",
		],
		bannerUrlApp: [
			"https://staging.apricart.pk/options/stream/click_and_collect_level_2_app_2022-04-11T22_26_23.593323.jpg",
		],
	});

	const deleteThisBanner = async (id) => {
		const { baseUrl, headers } = getGeneralApiParams();
		await deleteBannerApi(baseUrl, id, headers).then((response) => {
			checkStatus(response);
		});
	};

	useEffect(() => {
		setPropState(props);
	}, [props]);

	return (
		<section className="font-lato flex flex-col w-full mb-2 mt-1 justify-center items-center">
			<div className="font-nunito w-full justify-between flex bg-main-blue rounded-lg text-white px-12 font-bold">
				<h3>Banner Id: {propState.id}</h3>
				<h3>Banner Level: {propState.level}</h3>
			</div>
			<div className="font-lato font-bold p-1 text-center w-[70%] px-2 ">
				<h3>Website Banner</h3>
				<div>
					<Image
						className=""
						src={propState?.bannerUrlWeb[0]}
						alt={"bannerImg"}
						layout={"responsive"}
						objectFit={"cover"}
						width="20px"
						height="5px"
					/>
				</div>
			</div>
			<div className="font-lato font-bold p-1 text-center w-[55%] px-2 ">
				<h3>App Banner</h3>
				<Image
					className=""
					src={propState?.bannerUrlApp[0]}
					alt={"bannerImg"}
					layout={"responsive"}
					objectFit={"cover"}
					width="20px"
					height="5px"
				/>
			</div>
			<div className="flex w-full justify-around px-10">
				{/* <div className="w-1/5">
					<CustomButton width={"1/2"}>Edit Banner</CustomButton>
				</div> */}
				<div className="w-1/5 mt-12">
					<CustomButton onClick={(e) => deleteThisBanner(propState.id)}>
						Delete Banner
					</CustomButton>
				</div>
			</div>
		</section>
	);
};

export default EachBannerRenderComponent;
