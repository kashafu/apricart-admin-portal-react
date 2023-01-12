import { useState } from "react"

import FormData from "form-data"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	validateImage,
} from "../../../utils/GeneralVariables"
import { updateThankYouImageApi } from "../../../utils/ApiCalls"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const ThankyouImageAddUpdateAPIComponent = () => {
	var thankyou = new FormData()
	const [loading, setLoading] = useState(false)
	const [ren, setRen] = useState("")
	const [input, setInput] = useState({
		thanksImage: "",
		prodType: "b2b",
		orderType: "delivery",
		city: "karachi",
	})
	const { prodType, thanksImage, orderType, city } = input
	const handleText = (e) => {
		setInput({ ...input, text: e.target.value })
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
	const handleImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, thanksImage: verify })
		} else {
			setInput({ ...input, thanksImage: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}
	const updateRen = () => {
		setRen(Math.random().toString(36))
	}
	const fillFormData = () => {
		thankyou.append("thankyou_image", thanksImage)
		thankyou.append("prod_type", prodType)
		thankyou.append("order_type", orderType)
		thankyou.append("city", city)
	}

	const submitHandler = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl } = getGeneralApiParams()
		await fillFormData()
		await updateThankYouImageApi(baseUrl, thankyou).then((response) => {
			checkStatus(response)
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Thank You Page Banner Update"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Update"}
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
					<CustomSingleImageInput
						position={"bottom"}
						heading={"Upload New Thank You Image"}
						onChange={(e) => {
							handleImage(e)
						}}
						ren={ren}
					/>
				</>
			}
		/>
	)
}

export default ThankyouImageAddUpdateAPIComponent
