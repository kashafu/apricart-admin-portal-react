import Image from "next/image"

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { deleteBannerApi } from "../../../utils/ApiCalls"
import CustomButton from "../../Misc/CustomButton"

const EachBannerRenderComponent = ({ banner, refreshBannerList }) => {
	const deleteThisBanner = async (id) => {
		const { baseUrl, headers } = getGeneralApiParams()
		await deleteBannerApi(baseUrl, id, headers).then((response) => {
			checkStatus(response)
			refreshBannerList()
		})
	}

	return (
		<section className="font-lato flex flex-col w-full mb-2 mt-1 justify-center items-center">
			<div className="font-nunito w-full justify-between flex bg-main-blue rounded-lg text-white px-12 font-bold">
				<h3>Banner Id: {banner.id}</h3>
				<h3>Banner Level: {banner.level}</h3>
			</div>
			<div className="font-lato font-bold p-1 text-center w-[70%] px-2 ">
				<h3>Website Banner</h3>
				<div>
					<Image
						className=""
						src={banner?.bannerUrlWeb[0]}
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
					src={banner?.bannerUrlApp[0]}
					alt={"bannerImg"}
					layout={"responsive"}
					objectFit={"cover"}
					width="20px"
					height="5px"
				/>
			</div>
			<div className="flex w-full justify-around px-10">
				<div className="w-1/5 mt-12">
					<CustomButton
						onClick={(e) => deleteThisBanner(banner.id)}
					>
						Delete Banner
					</CustomButton>
				</div>
			</div>
		</section>
	)
}

export default EachBannerRenderComponent
