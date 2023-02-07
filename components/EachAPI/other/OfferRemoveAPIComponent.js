import { useState, useEffect } from "react"

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { getAllOffersApi, offerRemoveApi } from "../../../utils/ApiCalls"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const OfferRemoveAPIComponent = () => {
	const [offerId, setOfferId] = useState("")
	const [allOffers, setAllOffers] = useState([])
	const [loading, setLoading] = useState(false)

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
			status && setOfferId(response.data.data[0].id)
		})
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await offerRemoveApi(
			baseUrl,
			{
				offerIds: [offerId],
			},
			headers
		).then((response) => {
			setLoading(false)
			checkStatus(response, "Offer Removed")
			callAllOffersApi()
		})
	}

	return (
		<SingleAPILayout
			heading={"Remove Offer"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Remove"}
			rowItems={
				<CustomSelectInput
					heading={"Offer ID"}
					onChange={setOfferId}
					value={offerId}
					options={allOffers}
					optionText="id"
				/>
			}
		/>
	)
}

export default OfferRemoveAPIComponent
