import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { downloadUsersApi } from "../../../utils/ApiCalls"
import { getGeneralApiParams } from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const GetUsersReportsAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [disabler, setDisabler] = useState(false)
	const fetchReport = async () => {
		setDisabler(true)
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await downloadUsersApi(baseUrl, headers).then((res) => {
			toast.info(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: "XD",
				}
			)
			setLoading(false)
		})

		setTimeout(() => {
			setDisabler(false)
		}, 8000)
	}

	return (
		<SingleAPILayout
			heading={"Total Users Report"}
			loading={loading}
			buttonOnClick={(e) => fetchReport(e)}
			buttonText={"Download"}
		/>
	)
}

export default GetUsersReportsAPIComponent
