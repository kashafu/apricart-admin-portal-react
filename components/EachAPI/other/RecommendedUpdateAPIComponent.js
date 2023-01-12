import React, { useState } from "react"

import { recommendedUpdateApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import Loading from "../../../utils/Loading"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomButton from "../../Misc/CustomButton"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import Heading from "../../Misc/Heading"

const RecommendedUpdateAPIComponent = () => {
	const [inputs, setInputs] = useState({
		text: "",
		prodType: "b2b",
		orderType: "delivery",
		city: "karachi",
	})
	const { text, prodType, orderType, city } = inputs
	const [loading, setLoading] = useState(false)
	const handleText = (e) => {
		setInputs({ ...inputs, text: e.target.value })
	}
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value })
	}
	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value })
	}
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value })
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await recommendedUpdateApi(
			baseUrl,
			prodType,
			orderType,
			city,
			text,
			headers
		).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
	}


	return (
		<SingleAPILayout
			heading={"Recommended Products Update"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Save"}
			gridItems={
				<>
					<CustomInput
						position={"top"}
						type={"text"}
						value={text}
						onChange={handleText}
						required={true}
						heading={"Enter SKU's comma separated (2 or more)"}
					/>
					<CustomSelectInput
						heading={"Select Product Type"}
						customOnChange={handleProdType}
						value={inputs.prodType}
						options={[
							{
								name: "Online Delivery",
								id: "b2b"
							},
							{
								name: "Customer",
								id: "cus"
							}]
						}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select Order Type"}
						customOnChange={handleOrderType}
						value={inputs.orderType}
						options={[
							{
								name: "Delivery",
								id: "delivery"
							},
							{
								name: "Pick up",
								id: "pickup"
							}]
						}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select City"}
						customOnChange={handleCity}
						value={inputs.city}
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
				</>
			}
		/>
	)
}

export default RecommendedUpdateAPIComponent
