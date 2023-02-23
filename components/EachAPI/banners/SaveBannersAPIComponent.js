import { useEffect, useState } from "react"

import FormData from "form-data"
import { getAllOffersApi, saveBannersApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import CustomInput from "../../Misc/CustomInput"
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const SaveBannersAPIComponent = () => {
	var bannerData = new FormData()
	const [loading, setLoading] = useState(false)
	const [allOffers, setAllOffers] = useState([])
	const [ren, setRen] = useState("")
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		prodType: "b2b",
		orderType: "delivery",
		type: "none",
		offerId: "",
		level: 1,
		city: "karachi",
	})

	useEffect(() => {
		callAllOffersApi()
	}, [])

	const callAllOffersApi = async () => {
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await getAllOffersApi(baseUrl, headers).then((response) => {
			setLoading(false)
			let status = checkStatus(response)
			status && setAllOffers(response.data.data)
			status && setInput({ ...input, offerId: response.data.data[0].id })
		})
	}

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

	const fillFormData = () => {
		bannerData.append("app", input.bannerUrlApp)
		bannerData.append("web", input.bannerUrlWeb)
		bannerData.append("prod_type", input.prodType)
		bannerData.append("order_type", input.orderType)
		if (input.type === 'none') {
			bannerData.append("type", "offer")
			bannerData.append("offer_id", 0)
		}
		else if (input.type === 'offer') {
			bannerData.append("type", "offer")
			bannerData.append("offer_id", input.offerId)
		}
		else if (input.type === 'product') {
			bannerData.append("type", "product")
			bannerData.append("offer_id", input.offerId)
		}
		bannerData.append("level", input.level)
		bannerData.append("city", input.city)
		bannerData.append("lang", "en")
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		fillFormData()
		await saveBannersApi(baseUrl, bannerData, headers).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
	}

	return (
		<SingleAPILayout
			heading={"Banner Save"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Save"}
			gridItems={
				<>
					<CustomSelectInput
						heading={"Select Product Type"}
						customOnChange={(e) => {
							setInput({ ...input, prodType: e.target.value })
						}}
						value={input.prodType}
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
						customOnChange={(e) => {
							setInput({ ...input, orderType: e.target.value })
						}}
						value={input.orderType}
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
						customOnChange={(e) => {
							setInput({ ...input, city: e.target.value })
						}}
						value={input.city}
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
					<CustomSelectInput
						heading={"Select Type"}
						customOnChange={(e) => {
							setInput({ ...input, type: e.target.value })
						}}
						value={input.type}
						options={[
							{
								name: "No Redirection",
								id: "none",
							},
							{
								name: "Offer",
								id: "offer",
							},
							{
								name: "Product",
								id: "product",
							},
						]}
						optionText="name"
					/>
					{input.type === 'offer' && (
						<CustomSelectInput
							heading={"Offer ID"}
							customOnChange={(e) => {
								setInput({ ...input, offerId: e.target.value })
							}}
							value={input.offerId}
							options={allOffers}
							optionText="id"
						/>
					)}
					{input.type === 'product' && (
						<CustomInput
							heading={"Product SKU"}
							onChange={(e) => {
								setInput({ ...input, offerId: e.target.value })
							}}
							value={input.offerId}
						/>
					)}
					<CustomSelectInput
						heading={"Select Level"}
						customOnChange={(e) =>
							setInput({ ...input, level: e.target.value })
						}
						value={input.level}
						options={[
							{
								name: "Main Scrollable",
								id: 1,
							},
							{
								name: "Second Level",
								id: 2,
							},
							{
								name: "Third Level",
								id: 3,
							},
							{
								name: "Fourth Level",
								id: 4,
							},
						]}
						optionText="name"
					/>
					<CustomSingleImageInput
						heading={"Upload Web Banner"}
						ren={ren}
						onChange={handleWebImage}
					/>
					<CustomSingleImageInput
						position={"bottom"}
						heading={"Upload App Banner"}
						ren={ren}
						onChange={handleAppImage}
					/>
				</>
			}
		/>
	)
}

export default SaveBannersAPIComponent
