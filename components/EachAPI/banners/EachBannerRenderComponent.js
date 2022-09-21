import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { deleteBannerApi } from "../../../utils/ApiCalls";

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
		<section className="flex w-full mb-2 mt-1 justify-center items-center">
			<div className="w-2/3 p-1">
				<Image
					className=""
					src={propState?.bannerUrlWeb[0]}
					alt={"bannerImg"}
					layout={"responsive"}
					width="20px"
					height="5px"
				/>
			</div>
			<div className="w-1/3">
				<button
					type="submit"
					// onClick={(e) => submitResetPassword(e)}
					className="my-2 w-full py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
				>
					Edit Banner
				</button>
				<button
					type="submit"
					onClick={(e) => deleteThisBanner(propState.id)}
					className="my-2 w-full py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
				>
					Delete Banner
				</button>
			</div>
		</section>
	);
};

export default EachBannerRenderComponent;
