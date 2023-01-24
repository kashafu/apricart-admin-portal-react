import { useEffect, useState } from "react"
import FormData from "form-data"

import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import {
	updateCategoryBannerApi,
	useCategoriesAllLevelsApi,
} from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const UpdateCategoryBannerAPIComponent = () => {
	var bannerData = new FormData()
	const [loading, setLoading] = useState(false)
	const [ren, setRen] = useState(false)
	const [selectedOrderType, setSelectedOrderType] = useState({
		name: "Online Delivery",
		id: {
			"prodType": "b2b",
			"orderType": "delivery"
		}
	})
	const [input, setInput] = useState({
		bannerUrlApp: "",
		bannerUrlWeb: "",
		categoryId: "",
		city: "karachi",
		prodType: selectedOrderType.id.prodType,
		orderType: selectedOrderType.id.orderType,
	})

	const { categories, setCity, setOrderType, setProdType, isLoading } = useCategoriesAllLevelsApi()

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading])

	const handleWebImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, bannerUrlWeb: verify })
		} else {
			setInput({ ...input, bannerUrlWeb: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}

	const handleAppImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, bannerUrlApp: verify })
		} else {
			setInput({ ...input, bannerUrlApp: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}

	const handleCategoryId = (e) => {
		setInput({ ...input, categoryId: e.target.value })
	}

	const handleCity = (e) => {
		setCity(e.target.value)
		setInput({ ...input, city: e.target.value })
	}

	const handleOrderType = (e) => {
		let json = JSON.parse(e.target.value)
		setSelectedOrderType(json)

		setOrderType(json.id.orderType)
		setInput({ ...input, orderType: json.id.orderType })

		setProdType(json.id.prodType)
		setInput({ ...input, prodType: json.id.prodType })
	}

	const fillFormData = () => {
		bannerData.append("app", input.bannerUrlApp)
		bannerData.append("web", input.bannerUrlWeb)
		bannerData.append("category_id", input.categoryId)
		bannerData.append("city", input.city)
		bannerData.append("order_type", input.orderType)
		bannerData.append("prod_type", input.prodType)
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl } = getGeneralApiParams()
		fillFormData()
		await updateCategoryBannerApi(baseUrl, bannerData).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
	}

	return (
		<>
			<SingleAPILayout
				heading={"Category Banner Update"}
				loading={loading}
				buttonOnClick={(e) => submitHandler(e)}
				buttonText={"Update"}
				gridItems={
					<>
						<CustomSelectInput
							heading={"Select City"}
							customOnChange={handleCity}
							value={input.city}
							options={[
								{
									name: "Karachi",
									id: "karachi"
								},
								{
									name: "Peshawar",
									id: "peshawar"
								}]
							}
							optionText="name"
						/>
						<CustomSelectInput
							heading={"Select Order Type"}
							customOnChange={handleOrderType}
							customValue
							value={selectedOrderType}
							options={[
								{
									name: "Online Delivery",
									id: {
										"prodType": "b2b",
										"orderType": "delivery"
									}
								}, {
									name: "Click n Collect",
									id: {
										"prodType": "cus",
										"orderType": "pickup"
									}
								}
							]}
							optionText="name"
						/>
						<CustomSelectInput
							heading={"Select Category"}
							placeholder="Select Category"
							customOnChange={handleCategoryId}
							value={input.categoryId}
							options={categories}
							optionText="name"
						/>
						<CustomSingleImageInput
							heading={"Upload Web Banner"}
							onChange={(e) => handleWebImage(e)}
							ren={ren}
						/>
						<CustomSingleImageInput
							heading={"Upload App Banner"}
							onChange={(e) => handleAppImage(e)}
							position={"bottom"}
							ren={ren}
						/>
					</>
				}
			/>
		</>
	)
}

export default UpdateCategoryBannerAPIComponent
