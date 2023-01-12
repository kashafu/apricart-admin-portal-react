import { useState } from "react"

import { downloadAbundantCartApi } from "../../../utils/ApiCalls"
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"

const GetAbundantCartReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [horas, setHoras] = useState(5)
	const [disabler, setDisabler] = useState(false)

	const fetchReport = async (e) => {
		setDisabler(true)
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await downloadAbundantCartApi(baseUrl, horas, headers).then(() => {
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
			heading={"Abundant Cart Report"}
			loading={loading}
			buttonOnClick={(e) => fetchReport(e)}
			buttonText={"Download"}
			rowItems={
				<CustomInput
					heading={"Enter Hours"}
					value={horas}
					type={"number"}
					onChange={(e) => {
						setHoras(e.target.value)
					}}
				/>
			}
		/>
	)
}

export default GetAbundantCartReportsAPIComponent
