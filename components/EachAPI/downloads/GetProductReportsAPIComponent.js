import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"

import { downloadProductsApi } from "../../../utils/ApiCalls"
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const GetProductReportsAPIComponent = () => {
	const [disabler, setDisabler] = useState(false)
	const [loading, setLoading] = useState(false)
	const [summary, setSummary] = useState(false)

	const fetchReport = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await downloadProductsApi(baseUrl, headers, summary).then(() => {
			setDisabler(true)
			setLoading(false)
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				8000
			)
			setLoading(false)
			setTimeout(() => {
				setDisabler(false)
			}, 8000)
		})
	}

	return (
		<SingleAPILayout
			heading={"Total Users Report"}
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

export default GetProductReportsAPIComponent
