import { useEffect, useState } from "react"
import { addCouponApi, getAllCategoriesApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const AddnUpdateCouponAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [displayExpiry, setDisplayExpiry] = useState("")

	const [inputs, setInputs] = useState({
		name: "",
		discount: "",
		isPercent: true,
		active: true,
		usageLimit: "",
		minSubTotal: "",
		expiry: "",
		productSkus: "",
		whitelist: true,
		phoneNumber: "",
		whitelistPhoneNumber: true,
		oncePhoneNumber: false,
		deliveryOnly: true,
		prodType: "b2b",
		cityInfo: 1,
	})

	const handleName = (e) => {
		setInputs({ ...inputs, name: e.target.value })
	}
	const handleDiscount = (e) => {
		setInputs({ ...inputs, discount: e.target.value })
	}
	const handleIsPercent = (e) => {
		setInputs({ ...inputs, isPercent: e.target.value })
	}
	const handleActive = (e) => {
		setInputs({ ...inputs, active: e.target.value })
	}
	const handleUsageLimit = (e) => {
		setInputs({ ...inputs, usageLimit: e.target.value })
	}
	const handleMinSubTotal = (e) => {
		setInputs({ ...inputs, minSubTotal: e.target.value })
	}
	const handleExpiry = (e) => {
		let newExp = e.target.value.concat("T00:00:00Z")
		setInputs({ ...inputs, expiry: newExp })
		setDisplayExpiry(e.target.value)
	}
	const handlePhoneNumber = (e) => {
		setInputs({ ...inputs, phoneNumber: e.target.value })
	}
	const handleDeliveryOnly = (e) => {
		setInputs({ ...inputs, deliveryOnly: e.target.value })
	}
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value })
	}
	const handleCityInfo = (e) => {
		setInputs({ ...inputs, cityInfo: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await addCouponApi(baseUrl, inputs, headers).then((response) => {
			checkStatus(response, "Coupon created successfully")
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Add and Update Coupons"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Save"}
			gridItems={
				<>
					<CustomInput
						type={"text"}
						value={inputs.name}
						onChange={(e) => handleName(e)}
						required={true}
						heading={"Name"}
					/>
					<CustomInput
						type={"number"}
						value={inputs.discount}
						onChange={(e) => handleDiscount(e)}
						required={true}
						heading={"Discount"}
					/>
					<CustomSelectInput
						heading={"Is Percent?"}
						customOnChange={handleIsPercent}
						value={inputs.isPercent}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Is Active?"}
						customOnChange={handleActive}
						value={inputs.active}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomInput
						type={"number"}
						value={inputs.usageLimit}
						onChange={(e) => handleUsageLimit(e)}
						required={true}
						heading={"Usage Limit"}
					/>
					<CustomInput
						type={"number"}
						value={inputs.minSubTotal}
						onChange={(e) => handleMinSubTotal(e)}
						required={true}
						heading={"Minimum Subtotal"}
					/>
					<CustomInput
						value={displayExpiry}
						onChange={(e) => handleExpiry(e)}
						type="date"
						heading={"Expiry date"}
					/>
					<CustomInput
						type={"text"}
						value={inputs.phoneNumber}
						onChange={(e) => handlePhoneNumber(e)}
						required={true}
						heading={"Phone Number (ex. 923319970706)"}
					/>
					<CustomSelectInput
						heading={"Delivery Only?"}
						customOnChange={handleDeliveryOnly}
						value={inputs.deliveryOnly}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
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
						heading={"Select City"}
						customOnChange={handleCityInfo}
						value={inputs.cityInfo}
						options={[
							{
								name: "Karachi",
								id: 1,
							},
							{
								name: "Peshawar",
								id: 4,
							},
						]}
						optionText="name"
					/>
				</>
			}
		/>
	)
}

export default AddnUpdateCouponAPIComponent
