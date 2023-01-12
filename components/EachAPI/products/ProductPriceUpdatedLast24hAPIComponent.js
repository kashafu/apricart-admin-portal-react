import { useState } from "react"

import { productPriceUpdatedLast24HoursApi } from "../../../utils/ApiCalls"
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"

const ProductPriceUpdatedLast24hAPIComponent = () => {
	const [time, setTime] = useState(24)
	const [disabler, setDisabler] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleTime = (e) => {
		setTime(e.target.value)
	}

	const handleSubmit = () => {
		const { baseUrl, headers } = getGeneralApiParams()
		productPriceUpdatedLast24HoursApi(baseUrl, time, headers).then(() => {
			setDisabler(true)
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				5000
			)
			setLoading(false)
			setTimeout(() => {
				setDisabler(false)
			}, 8000)
		})
	}

	return (
		<SingleAPILayout
			heading={"Updated in Last 24 Hours"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Download"}
			rowItems={
				<CustomInput
					heading={"Time in hours"}
					value={time}
					onChange={(e) => handleTime(e)}
				/>
			}
		/>
	)
}

export default ProductPriceUpdatedLast24hAPIComponent
