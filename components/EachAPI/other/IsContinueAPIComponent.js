import React, { useState } from "react"

import CustomInput from "../../Misc/CustomInput"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { isContinueUpdateApi } from "../../../utils/ApiCalls"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const IsContinueAPIComponent = () => {
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
		var encodedText = encodeURI(text)

		await isContinueUpdateApi(
			baseUrl,
			prodType,
			orderType,
			city,
			encodedText,
			headers
		).then((response) => {
			setLoading(false)
			checkStatus(response, "isContinue text Updated")
		})
	}

	return (
		<SingleAPILayout
			heading={"Is Continue"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Save"}
			gridItems={
				<>
					<CustomInput
						heading={"Enter Text"}
						position={"top"}
						type={"text"}
						value={text}
						onChange={handleText}
						required={true}
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

export default IsContinueAPIComponent
