import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"

import { downloadOutOfStockApi } from "../../../utils/ApiCalls"
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const GetProductsOutOfStockAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [summary, setSummary] = useState(false)
	const [disabler, setDisabler] = useState(false)

	const handleState = (e) => {
		setSummary(e.target.value)
	}

	const fetchReport = async (e) => {
		setDisabler(true)
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await downloadOutOfStockApi(baseUrl, summary, headers).then(() => {
			setLoading(false)
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
			heading={"Out of Stock Report"}
			loading={loading}
			buttonOnClick={(e) => fetchReport(e)}
			buttonText={"Download"}
			rowItems={
				<CustomSelectInput
					heading={"Summary Version?"}
					onChange={setSummary}
					value={summary}
					options={[
						{
							name: "Yes",
							id: true,
						},
						{
							name: "No",
							id: false,
						},
					]}
					optionText="name"
				/>
			}
		/>
	)
}

export default GetProductsOutOfStockAPIComponent
