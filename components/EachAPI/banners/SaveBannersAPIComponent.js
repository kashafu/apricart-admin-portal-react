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
		type: "",
		offerId: "",
		level: 0,
		city: "karachi",
	})
	const {
		bannerUrlApp,
		bannerUrlWeb,
		prodType,
		orderType,
		type,
		offerId,
		level,
		city,
	} = input

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

	const handleProdType = (e) => {
		setInput({ ...input, prodType: e.target.value })
	}
	const handleOrderType = (e) => {
		setInput({ ...input, orderType: e.target.value })
	}
	const handleCity = (e) => {
		setInput({ ...input, city: e.target.value })
	}

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp)
		bannerData.append("web", bannerUrlWeb)
		bannerData.append("prod_type", prodType)
		bannerData.append("order_type", orderType)
		bannerData.append("type", type)
		bannerData.append("offer_id", offerId)
		bannerData.append("level", level)
		bannerData.append("city", city)
		bannerData.append("lang", "en")
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await fillFormData()
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
						customOnChange={handleProdType}
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
						customOnChange={handleOrderType}
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
						customOnChange={handleCity}
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
					<CustomInput
						value={type}
						onChange={(e) =>
							setInput({ ...input, type: e.target.value })
						}
						type="text"
						placeholder="Type"
						heading="Enter Type"
					/>
					<CustomSelectInput
						heading={"Offer ID"}
						customOnChange={(e) => {
							setInput({ ...input, offerId: e.target.value })
						}}
						value={offerId}
						options={allOffers}
						optionText="id"
					/>
					<CustomSelectInput
						heading={"Select Level"}
						customOnChange={(e) =>
							setInput({ ...input, level: e.target.value })
						}
						value={input.level}
						options={[
							{
								name: "0",
								id: 0,
							},
							{
								name: "1",
								id: 1,
							},
							{
								name: "2",
								id: 2,
							},
							{
								name: "3",
								id: 3,
							},
							{
								name: "4",
								id: 4,
							},
							{
								name: "5",
								id: 5,
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
