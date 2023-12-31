import { useState } from "react"

import CustomSelectInput from "../../Misc/CustomSelectInput"
import CustomInput from "../../Misc/CustomInput"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { sendNotificationApi } from "../../../utils/ApiCalls"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const NewNotificationSendAPIComponent = () => {
	const [inputs, setInputs] = useState({
		type: "offer",
		value: "",
		title: "",
		message: "",
		city: "Karachi",
		to: "alldev",
	})
	const [loading, setLoading] = useState(false)
	const [toState, setToState] = useState(true)
	const { type, value, title, message, city, to } = inputs

	const handleOffer = (e) => {
		setInputs({ ...inputs, type: e.target.value })
	}
	const handleValue = (e) => {
		setInputs({ ...inputs, value: e.target.value })
	}
	const handleTitle = (e) => {
		setInputs({ ...inputs, title: e.target.value })
	}
	const handleMessage = (e) => {
		setInputs({ ...inputs, message: e.target.value })
	}
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value })
	}
	const handleSKU = (e) => {
		setInputs({ ...inputs, sku: e.target.value })
	}
	const handleCategory = (e) => {
		setInputs({ ...inputs, category: e.target.value })
	}
	const handleSubCategory = (e) => {
		setInputs({ ...inputs, subcategory: e.target.value })
	}
	const handleTo = (e) => {
		if (e.target.value !== "alldev") {
			setToState(false)
			setInputs({ ...inputs, city: "" })
		} else {
			setToState(true)
		}
		setInputs({ ...inputs, to: e.target.value })
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		var encodedTitle = encodeURI(title)
		var encodedMessage = encodeURI(message)
		await sendNotificationApi(
			baseUrl,
			type,
			value,
			encodedTitle,
			encodedMessage,
			city,
			to,
			headers
		).then((response) => {
			setLoading(false)
			checkStatus(response, "Notification Sent Successfully")
		})
	}

	return (
		<SingleAPILayout
			heading={"Push Notifications"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Send"}
			gridItems={
				<>
					<CustomSelectInput
						heading={"Notification Type"}
						customOnChange={handleOffer}
						value={inputs.type}
						options={[
							{
								name: "Product",
								id: "product"
							},
							{
								name: "Category",
								id: "category"
							},
							{
								name: "Subcategory",
								id: "subcategory"
							},
							{
								name: "Offer",
								id: "offer"
							}
						]}
						optionText="name"
					/>
					{type === "offer" && (
						<CustomInput
							heading={"Value"}
							type={"number"}
							value={value}
							onChange={handleValue}
							required={true}
							min={0}
							placeholder={"Enter Value"}
						/>
					)}
					{type === "category" && (
						<CustomInput
							heading={"Category"}
							type={"text"}
							value={value}
							onChange={handleValue}
							required={true}
							min={0}
							placeholder={"Enter Category"}
						/>
					)}
					{type === "subcategory" && (
						<CustomInput
							heading={"Sub Category"}
							type={"text"}
							value={value}
							onChange={handleValue}
							required={true}
							min={0}
							placeholder={"Enter Category"}
						/>
					)}
					{type === "product" && (
						<CustomInput
							heading={"SKU"}
							type={"text"}
							value={value}
							onChange={handleValue}
							required={true}
							min={0}
							placeholder={"Enter SKU"}
						/>
					)}

					<CustomInput
						heading={"Title"}
						type={"text"}
						value={title}
						onChange={handleTitle}
						required={true}
						placeholder={"Enter Title"}
					/>
					<CustomInput
						heading={"Message"}
						type={"text"}
						value={message}
						onChange={handleMessage}
						required={true}
						placeholder={"Enter Message"}
					/>
					<CustomSelectInput
						heading={"Select Recipient Type"}
						customOnChange={handleTo}
						value={inputs.to}
						options={[
							{
								name: "All Devices",
								id: "alldev"
							},
							{
								name: "Individual Recipient",
								id: ""
							}]
						}
						optionText="name"
					/>
					{toState && (
						<CustomSelectInput
							heading={"Select City"}
							customOnChange={handleCity}
							value={inputs.city}
							options={[
								{
									name: "Karachi",
									id: "Karachi"
								},
								{
									name: "Peshawar",
									id: "Peshawar"
								}]
							}
							optionText="name"
						/>
					)}
					{/* if staging, alldev,
				on live, all */}
					{!toState && (
						<CustomInput
							heading={"Enter Recipient"}
							position={"bottom"}
							type={"text"}
							value={to}
							onChange={handleTo}
							required={true}
							placeholder={"Enter Topic"}
						/>
					)}
				</>
			}
		/>
	)

	// return (
	// 	<section className="px-10">
	// 		<Loading loading={loading} />
	// 		{/* <Heading>Push Notifications</Heading> */}
	// 		<form action="" method="POST">
	// 			<section className="grid grid-cols-2 pt-6">
	// 				<CustomSelectInput
	// 					values={["product", "category", "subcategory", "offer"]}
	// 					options={[
	// 						"Product",
	// 						"Category",
	// 						"Subcategory",
	// 						"Offer",
	// 					]}
	// 					onChange={handleOffer}
	// 					position={"top"}
	// 					heading={"Notification Type"}
	// 				/>
	// 				{type === "offer" && (
	// 					<CustomInput
	// 						heading={"Value"}
	// 						type={"number"}
	// 						value={value}
	// 						onChange={handleValue}
	// 						required={true}
	// 						min={0}
	// 						placeholder={"Enter Value"}
	// 					/>
	// 				)}
	// 				{type === "category" && (
	// 					<CustomInput
	// 						heading={"Category"}
	// 						type={"text"}
	// 						value={value}
	// 						onChange={handleCategory}
	// 						required={true}
	// 						min={0}
	// 						placeholder={"Enter Category"}
	// 					/>
	// 				)}
	// 				{type === "subcategory" && (
	// 					<CustomInput
	// 						heading={"Sub Category"}
	// 						type={"text"}
	// 						value={value}
	// 						onChange={handleSubCategory}
	// 						required={true}
	// 						min={0}
	// 						placeholder={"Enter Category"}
	// 					/>
	// 				)}
	// 				{type === "product" && (
	// 					<CustomInput
	// 						heading={"SKU"}
	// 						type={"text"}
	// 						value={value}
	// 						onChange={handleSKU}
	// 						required={true}
	// 						min={0}
	// 						placeholder={"Enter SKU"}
	// 					/>
	// 				)}

	// 				<CustomInput
	// 					heading={"Title"}
	// 					type={"text"}
	// 					value={title}
	// 					onChange={handleTitle}
	// 					required={true}
	// 					placeholder={"Enter Title"}
	// 				/>
	// 				<CustomInput
	// 					heading={"Message"}
	// 					type={"text"}
	// 					value={message}
	// 					onChange={handleMessage}
	// 					required={true}
	// 					placeholder={"Enter Message"}
	// 				/>
	// 				<CustomSelectInput
	// 					onChange={handleTo}
	// 					options={["All Devices", "Individual Recipient"]}
	// 					values={["alldev", ""]}
	// 					heading={"Select Recipient Type"}
	// 				/>
	// 				{toState && (
	// 					<CustomSelectInput
	// 						position={"bottom"}
	// 						onChange={(e) => handleCity(e)}
	// 						heading={"Select City"}
	// 						values={["karachi", "peshawar"]}
	// 						options={["Karachi", "Peshawar"]}
	// 					/>
	// 				)}
	// 				{/* if staging, alldev,
	// 			on live, all */}
	// 				{!toState && (
	// 					<CustomInput
	// 						heading={"Enter Recipient"}
	// 						position={"bottom"}
	// 						type={"text"}
	// 						value={to}
	// 						onChange={handleTo}
	// 						required={true}
	// 						placeholder={"Enter Topic"}
	// 					/>
	// 				)}
	// 			</section>
	// 			<CustomButton
	// 				width={"1/3"}
	// 				onClick={handleSubmit}
	// 				type={"submit"}
	// 			>
	// 				Send
	// 			</CustomButton>
	// 		</form>
	// 	</section>
	// )
}

export default NewNotificationSendAPIComponent
