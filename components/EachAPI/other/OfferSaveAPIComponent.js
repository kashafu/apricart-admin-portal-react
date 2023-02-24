import { useState } from "react"

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { offerSaveApi } from "../../../utils/ApiCalls"
import CustomInput from "../../Misc/CustomInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import Heading from "../../Misc/Heading"

const OfferSaveAPIComponent = () => {
	const [offerId, setOfferId] = useState("")
	const [loading, setLoading] = useState(false)
	const [input, setInput] = useState({
		price: 22.0,
		buying: "",
		buyingCondition: "",
		expiry: "",
		products: "",
		categories: "",
		type: "products",
	})
	const { buying, expiry, products } = input

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await offerSaveApi(baseUrl, input, headers).then((response) => {
			setLoading(false)
			let status = checkStatus(response)
			status && setOfferId(response.data.data.id)
		})
	}

	return (
		<SingleAPILayout
			heading={"Add Offer"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Create"}
			gridItems={
				<>
					<CustomInput
						value={buying}
						onChange={(e) => {
							setInput({ ...input, buying: e.target.value, buyingCondition: e.target.value })
						}}
						type="text"
						placeholder="Offer name"
						heading={"Offer name"}
						position={"bottom"}
					/>
					<CustomInput
						value={expiry}
						onChange={(e) =>
							setInput({ ...input, expiry: e.target.value })
						}
						type="date"
						placeholder="Expiry Date"
						heading={"Expiry date"}
					/>
					<CustomInput
						value={products}
						onChange={(e) =>
							setInput({ ...input, products: e.target.value })
						}
						type="text"
						placeholder="Products"
						heading="Products SKUS (comma seperated)"
					/>
				</>
			}
		>
			{offerId && (
				<div className="inline-flex animate-dropdown justify-center items-center space-x-2">
					<Heading>Your Offer Id is </Heading>
					<h2 className="text-5xl font-bold font-nunito text-main-blue">
						{offerId}
					</h2>
				</div>
			)}
		</SingleAPILayout>
	)
}

export default OfferSaveAPIComponent
