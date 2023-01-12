import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"

import { downloadOrdersApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import moment from "moment"
import CustomRadioInput from "../../Misc/CustomRadioInput"
import CustomInput from "../../Misc/CustomInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const GetOrdersReportsAPIComponent = () => {
	const [disabler, setDisabler] = useState(false)
	const [loading, setLoading] = useState(false)
	const [inputs, setInputs] = useState({
		cityId: 1,
		toDate: "",
		fromDate: "",
		skus: [],
	})

	const { cityId, toDate, fromDate, skus } = inputs

	const fetchReport = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await downloadOrdersApi(
			baseUrl,
			cityId,
			fromDate,
			toDate,
			skus,
			headers
		).then((response) => {
			let status = checkStatus(response)
			status &&
				displayInfoToast(
					"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
					6000
				)
			setLoading(false)
			setTimeout(() => {
				setDisabler(false)
			}, 8000)
		})
	}

	return (
		<SingleAPILayout
			heading={"Total Orders Report"}
			loading={loading}
			buttonOnClick={(e) => fetchReport(e)}
			buttonText={"Download"}
			gridItems={
				<>
					<CustomRadioInput
						inputs={["Peshawar", "Karachi"]}
						values={["4", "1"]}
						heading={"Select City"}
						name={"city"}
						onChange={(e) =>
							setInputs({ ...inputs, cityId: e.target.value })
						}
					/>
					<CustomInput
						heading={"From Date"}
						value={fromDate}
						onChange={(e) =>
							setInputs({
								...inputs,
								fromDate: moment(e.target.value).format(
									"YYYY-MM-DD"
								),
							})
						}
						required={true}
						type="date"
					/>
					<CustomInput
						heading={"To Date"}
						onChange={(e) =>
							setInputs({
								...inputs,
								toDate: moment(e.target.value).format(
									"YYYY-MM-DD"
								),
							})
						}
						required={true}
						type="date"
					/>
				</>
			}
		/>
	)
}

export default GetOrdersReportsAPIComponent
