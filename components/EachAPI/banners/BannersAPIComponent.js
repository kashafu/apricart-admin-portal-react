import { useState, useEffect } from "react"

import { getAllBannersApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import EachBannerRenderComponent from "./EachBannerRenderComponent"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const BannersAPIComponent = () => {
	const [banners, setBanners] = useState([])
	const [loading, setLoading] = useState(false)
	const [inputs, setInputs] = useState({
		prodType: "b2b",
		orderType: "delivery",
		city: "karachi",
	})
	const { prodType, orderType, city } = inputs

	useEffect(() => {
		fetchBannerData()
	}, [inputs])

	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value })
	}

	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value })
	}

	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value })
	}

	const fetchBannerData = async () => {
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await getAllBannersApi(
			baseUrl,
			prodType,
			orderType,
			city,
			headers
		).then((response) => {
			let status = checkStatus(response)
			status && setBanners(response.data.data)
			setLoading(false)
		})
	}

	return (
		<SingleTabLayout
			heading={"Banner Save"}
			loading={loading}
			gridItems={
				<>
					<CustomSelectInput
						heading={"Select Product Type"}
						customOnChange={handleProdType}
						value={inputs.prodType}
						options={[
							{
								name: "Online Delivery",
								id: "b2b",
							},
							{
								name: "Customer",
								id: "cus",
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select Order Type"}
						customOnChange={handleOrderType}
						value={inputs.orderType}
						options={[
							{
								name: "Delivery",
								id: "delivery",
							},
							{
								name: "Pick up",
								id: "pickup",
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select City"}
						customOnChange={handleCity}
						value={inputs.city}
						options={[
							{
								name: "Karachi",
								id: "karachi",
							},
							{
								name: "Peshawar",
								id: "peshawar",
							},
						]}
						optionText="name"
					/>
				</>
			}
		>
			<div className="divide-y-[1px] divide-main-blue">
				{banners.length > 0 ? (
					banners?.map((banner) => (
						<div key={banner.id}>
							<EachBannerRenderComponent banner={banner} />
						</div>
					))
				) : (
					<h3 className="text-center py-4">No Banners</h3>
				)}
			</div>
		</SingleTabLayout>
	)
}

export default BannersAPIComponent
