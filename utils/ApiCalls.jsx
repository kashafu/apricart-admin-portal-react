import FileSaver from "file-saver"
import { useState, useEffect } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import moment from "moment"
import { useDispatch } from "react-redux"

import { getGeneralApiParams } from "../utils/GeneralVariables"
import { initializeApis } from "../Redux/apis.slice"
import { useRouter } from "next/router"

let { baseUrl, headers } = getGeneralApiParams()

export const loginApi = async (
	baseUrl,
	city,
	userId,
	phoneNumber,
	password,
	router,
	headers
) => {
	const cookies = new Cookies()
	let url =
		baseUrl +
		"/auth/open/login?city=" +
		city +
		"&lang=en&client_type=apricart"
	let body = {
		guestuserid: userId,
		username: "92" + phoneNumber,
		password,
	}

	try {
		let response = await axios.post(url, body, {
			headers,
		})
		if (response.data.status == 1) {
			if (response.data.data.portal === false) {
				return {
					data: {
						status: 2,
						message: "You are unauthorized to access this feature",
					},
				}
			}
			cookies.set("cookies-token", response.data.data.token, {
				path: "/",
			})
			cookies.set("cookies-name", response.data.data.name, { path: "/" })
			cookies.set("cookies-email", response.data.data.email, {
				path: "/",
			})
			cookies.set("cookies-phoneNumber", response.data.data.phoneNumber, {
				path: "/",
			})
			cookies.set("cookies-userId", response.data.data.userId, {
				path: "/",
			})
			router.push("/")
			return response
		} else {
			return response
		}
	} catch (err) {
		return { data: { err, status: 400 } }
	}
}

export const useDashboardApi = () => {
	const dispatch = useDispatch()

	const [apis, setApis] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	let organizedPermissions = []

	useEffect(() => {
		callApi()
	}, [])

	let callApi = async () => {
		try {
			setIsLoading(true)

			let url = baseUrl + "/adminUser/dashboard"
			let response = await axios.get(url, headers)

			let sortedArray = response.data.data.apis.sort((a, b) => {
				a.category - b.category
			})

			sortedArray.forEach((element) => {
				if (organizedPermissions.length === 0) {
					organizedPermissions.push({
						category: element.category,
						apis: [element],
					})
				} else {
					if (
						organizedPermissions.at(-1).category === element.category
					) {
						organizedPermissions.at(-1).apis.push(element)
					} else {
						organizedPermissions.push({
							category: element.category,
							apis: [element],
						})
					}
				}
			})

			dispatch(initializeApis(organizedPermissions))
			setApis(organizedPermissions)
		} catch (error) {
			setErrorMessage(error?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		apis,
		isLoading,
		errorMessage,
	}
}

export const getAllAPIsApi = async (baseUrl, headers) => {
	const url = baseUrl + `/adminUser/dashboard`
	try {
		let response = await axios.get(url, {
			headers,
		})
		// Hard coded get all categories api
		response.data.data.apis.unshift({
			id: 0,
			name: "View Category",
			endpoint: "/admin/category/view",
			category: "Category",
		})
		return response
	} catch (error) {
		return error?.response
	}
}

export const getAllAPIsPhase2Api = async (baseUrl, headers) => {
	const url = baseUrl + `/adminUser/dashboard`
	try {
		let response = await axios.get(url, {
			headers,
		})
		// Hard coded get all categories api
		response.data.data.apis.unshift({
			id: 0,
			name: "View Category",
			endpoint: "/v1/category/view",
			category: "Category",
		})
		return response
	} catch (error) {
		return error?.response
	}
}

export const sendOtpApi = async (baseUrl, phoneNumber, headers) => {
	const url = baseUrl + "/auth/open/otp"
	let body = {
		phoneNumber: "92" + phoneNumber,
	}
	try {
		let response = await axios.post(url, body, {
			headers,
		})
		if (response.data.status == 1) {
		} else {
			console.log(
				"enter a phone number for otp request to reset password"
			)
		}
	} catch (e) {
		console.log(e)
	}
}

export const resetPasswordApi = async (
	baseUrl,
	phoneNumber,
	password,
	otp,
	headers
) => {
	let url =
		baseUrl + "/auth/open/password/forgot?lang=en&client_type=apricart"
	let body = {
		phoneNumber: "92" + phoneNumber,
		password: password,
		otp: otp,
	}
	try {
		let response = await axios.post(url, body, {
			headers,
		})
		if (response.data.status == 1) {
		}
	} catch (error) {
		return error?.response
	}
}

export const uploadImagesApi = async (baseUrl, images) => {
	let url = baseUrl + "/options/images/uploads"
	try {
		return await axios.post(url, images, {
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const uploadFilesApi = async (baseUrl, files) => {
	let url = baseUrl + "/options/files/uploads"

	try {
		return await axios.post(url, files, {
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const offerSaveApi = async (baseUrl, input, headers) => {
	const { price, buying, buyingCondition, expiry, products, categories } =
		input
	let newExp = expiry.concat("T00:00:00Z")
	let url = baseUrl + "/offers/add?city=karachi&lang=en"
	let body = {
		price,
		buying,
		buyingCondition,
		expiry: newExp,
		products,
		categories,
	}
	try {
		return await axios.post(url, body, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const downloadUsersApi = async (baseUrl, headers) => {
	const url = baseUrl + "/admin/download/users"

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				FileSaver.saveAs(blob.data, `User_Report_${dateString1}.csv`)
				return blob
			})
	} catch (error) {
		return error?.response
	}
}

export const downloadProductsApi = async (baseUrl, headers, summary) => {
	const url = baseUrl + `/admin/download/products?summary=${summary}`

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(
					blob.data,
					`Products_Report_${dateString1}.csv`
				)
				return blob
			})
	} catch (error) {
		return error?.response
	}
}

export const downloadOrdersApi = async (
	baseUrl,
	cityId,
	fromDate,
	toDate,
	skus,
	headers
) => {
	const url =
		baseUrl +
		`/admin/download/orders?cityid=${cityId}&from=${fromDate}&to=${toDate}&skus=${skus}`

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(blob.data, `Orders_Report_${dateString1}.csv`)
				return blob
			})
	} catch (error) {
		return error.response
	}
}

export const downloadAbundantCartApi = async (baseUrl, horas, headers) => {
	const url =
		baseUrl + `/admin/download/abundantcart?interval_in_hours=${horas}`
	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(
					blob.data,
					`Abundant_Report_${horas}h_${dateString1}.csv`
				)
				return blob
			})
	} catch (error) {
		return error?.response
	}
}

export const downloadOutOfStockApi = async (baseUrl, summary, headers) => {
	const url =
		baseUrl + `/admin/download/products/outofstock?summary=${summary}`
	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(
					blob.data,
					`Products_Out_Of_Stock_${dateString1}.csv`
				)
				return blob
			})
	} catch (error) {
		return error?.response
	}
}

export const addProductCSVApi = async (baseUrl, file, headers) => {
	updateProductCSVApi
	let entries = file.entries().next()
	const { value } = entries

	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		}
	}
	let url = baseUrl + `/admin/product/csv/update?apitoken`
	try {
		return await axios.post(url, file, {
			...headers,
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const updateProductCSVApi = async (baseUrl, file, headers) => {
	let entries = file.entries().next()
	const { value } = entries
	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		}
	}
	let url = baseUrl + `/admin/product/csv/addupdate?apitoken`
	try {
		return await axios.post(url, file, {
			...headers,
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const productImageUpdateApi = async (baseUrl, data, headers) => {
	const url = baseUrl + `/options/images/uploads`
	try {
		return await axios.post(url, data, { headers })
	} catch (error) {
		return error?.response
	}
}

export const productIsActiveApi = async (
	baseUrl,
	sku,
	state,
	warehouseId,
	headers
) => {
	const url =
		baseUrl +
		`/admin/products/activeinactive?sku=${sku}&state=${state}&warehouse_ids=${warehouseId}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getAllBannersApi = async (
	baseUrl,
	prodType,
	orderType,
	city,
	headers
) => {
	const url =
		baseUrl +
		`/offers/banners?prod_type=${prodType}&order_type=${orderType}&city=${city}&lang=en`

	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const deleteBannerApi = async (baseUrl, id, headers) => {
	const url = baseUrl + `/offers/banners/remove`
	try {
		return await axios.post(
			url,
			{ id },
			{
				headers,
			}
		)
	} catch (error) {
		return error?.response
	}
}

export const saveBannersApi = async (baseUrl, banner) => {
	let url = baseUrl + "/banners/add"
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const updateBannersApi = async (baseUrl, newBanner, headers) => {
	let url = baseUrl + "/offers/banners/update"
	try {
		return await axios.post(url, newBanner, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const updateTickerApi = async (
	baseUrl,
	text,
	prodType,
	orderType,
	city,
	headers
) => {
	let url =
		baseUrl +
		`/misc/ticker/update?text=${encodeURIComponent(
			text
		)}&prod_type=${prodType}&order_type=${orderType}&city=${city}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const sendNotificationApi = async (
	baseUrl,
	type,
	value,
	title,
	message,
	city,
	to,
	headers
) => {
	let url =
		baseUrl +
		`/misc/notification?type=${type}&value=${value}&title=${title}&message=${message}&city=${city}&to=${to}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const isContinueUpdateApi = async (
	baseUrl,
	prodType,
	orderType,
	city,
	text,
	headers
) => {
	let url =
		baseUrl +
		`/misc/isContinue/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const recommendedUpdateApi = async (
	baseUrl,
	prodType,
	orderType,
	city,
	text,
	headers
) => {
	let url =
		baseUrl +
		`/misc/recommended/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const webUpdateApi = async (
	baseUrl,
	prodType,
	orderType,
	city,
	text,
	headers
) => {
	let url =
		baseUrl +
		`/admin/web/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const productStockDetailAdminApi = async (
	baseUrl,
	id,
	city,
	headers
) => {
	let url =
		baseUrl + `/admin/products/stock/detail?id=${id}&city=${city}&lang=en`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const productAdminDetailApi = async (
	baseUrl,
	id,
	city,
	warehouse_id,
	headers
) => {
	let url =
		baseUrl +
		`/admin/products/detail?id=${id}&city=${city}&lang=en&warehouse_id=${warehouse_id}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const popupRedirectionUpdateApi = async (baseUrl, banner) => {
	let url = baseUrl + "/admin/popup/redirection/update"
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const csrOrderCancelApi = async (
	baseUrl,
	apitoken,
	orderId,
	headers
) => {
	let url = baseUrl + `/order/cancel?apitoken=${apitoken}&orderid=${orderId}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const csrOrderCompleteApi = async (
	baseUrl,
	apitoken,
	orderId,
	headers
) => {
	let url =
		baseUrl + `/order/complete?apitoken=${apitoken}&orderid=${orderId}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const productsAdminSearchApi = async (
	baseUrl,
	page,
	size,
	term,
	category,
	city,
	userId,
	headers
) => {
	let cancelPrevRequest

	//Check if there are any previous pending requests
	if (typeof cancelPrevRequest != typeof undefined) {
		cancelPrevRequest.cancel("Operation canceled due to new request.")
	}

	//Save the cancel token for the current request
	cancelPrevRequest = axios.CancelToken.source()

	let url =
		baseUrl +
		`/admin/products/search?page=${page}&size=${size}&term=${term}&category=${category}&city=${city}&lang=en&userid=${userId}`
	try {
		return await axios.get(url, {
			headers,
			// cancelToken: cancelPrevRequest.token,
		})
	} catch (error) {
		return error?.response
	}
}

export const productPriceUpdatedLast24HoursApi = async (
	baseUrl,
	time,
	headers
) => {
	const url =
		baseUrl +
		`/admin/download/products/price/updatedinlast24hours?interval_in_hours=${time}`

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD")
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				FileSaver.saveAs(
					blob.data,
					`Products_Updated_Last${time}h_${dateString1}.csv`
				)
				return blob
			})
	} catch (error) {
		return error?.response
	}
}

export const productPositionDeleteAdminApi = async (
	baseUrl,
	id,
	prodType,
	orderType,
	headers
) => {
	const url =
		baseUrl +
		`/admin/products/position/remove?id=${id}&prod_type=${prodType}&order_type=${orderType}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error.response
	}
}

export const updateProductPositionCSVApi = async (baseUrl, files, headers) => {
	let entries = files.entries().next()
	const { value } = entries

	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		}
	}
	let url = baseUrl + `/admin/product/position/csv/update	`
	try {
		return await axios.post(url, files, {
			...headers,
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const productPositionDetailApi = async (
	baseUrl,
	prodType,
	orderType,
	type,
	headers
) => {
	const url =
		baseUrl +
		`/admin/products/position/detail?prod_type=${prodType}&order_type=${orderType}&type=${type}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error.response
	}
}

export const addCategoryApi = async (baseUrl, categoryData, headers) => {
	let url = baseUrl + "/admin/category/add"
	try {
		return await axios.post(url, categoryData, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const updateCategoryApi = async (baseUrl, categoryData, headers) => {
	let url = baseUrl + "/admin/category/update"
	try {
		return await axios.post(url, categoryData, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const updateCategoryBannerApi = async (baseUrl, banner) => {
	let url = baseUrl + "/category/update/banner"
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const updateCategoryImageApi = async (baseUrl, banner) => {
	let url = baseUrl + "/admin/category/image/update"
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const updateWelcomeVideoApi = async (baseUrl, link, headers) => {
	const url = baseUrl + `/misc/video/welcome/update?url=${link}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error.response
	}
}

export const updateThankYouImageApi = async (baseUrl, thankyouData) => {
	let url = baseUrl + "/misc/thankyou/image"
	try {
		return await axios.post(url, thankyouData, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		})
	} catch (error) {
		return error?.response
	}
}

export const useCategoriesApi = () => {
	const [city, setCity] = useState("")
	const [prodType, setProdType] = useState("")
	const [orderType, setOrderType] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [categories, setCategories] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		callApi()
	}, [city, prodType, orderType])

	const callApi = async () => {
		setIsLoading(true)
		let { headers, baseUrl } = getGeneralApiParams()
		let url = baseUrl + `/catalog/categories?level=all&city=${city}&userid=abc123&client_type=apricart&prod_type=${prodType}&order_type=${orderType}&lang=en`

		try {
			let apiResponse = await axios.get(url, {
				headers: headers,
			})
			setCategories(apiResponse.data.data)
		} catch (error) {
			setErrorMessage(error?.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, categories, errorMessage, setOrderType, setCity, setProdType }
}

export const getAllCategoriesApi = async (baseUrl, headers) => {
	const url = baseUrl + `/catalog/categories?level=all&userid=abc123`
	var instance = axios.create()
	delete instance.defaults.headers.common["Authorization"]
	try {
		return await instance.get(url, {
			headers,
		})
	} catch (error) {
		return error.response
	}
}

export const addCouponApi = async (baseUrl, coupon, headers) => {
	let url = baseUrl + "/admin/coupons/save"

	try {
		return await axios.post(url, coupon, { headers })
	} catch (error) {
		return error?.response
	}
}

export const editBannerApi = async (baseUrl, banner, headers) => {
	let url = baseUrl + "/offers/banners/update"

	try {
		return await axios.post(url, banner, { headers })
	} catch (error) {
		return error?.response
	}
}

// New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs
// New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs
// New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs New APIs

export const createAndUpdateRoleApi = async (
	baseUrl,
	name,
	active,
	id,
	headers
) => {
	let body
	let url = baseUrl + "/adminUser/role/saveOrUpdate"
	if (id.length === 0) {
		body = { name, active }
	} else {
		body = {
			id,
			name,
			active,
		}
	}
	try {
		return await axios.post(url, body, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const createAndUpdatePermsissionApi = async (
	baseUrl,
	id,
	apiName,
	apiURL,
	active,
	headers
) => {
	let body
	let url = baseUrl + "/adminUser/permission/saveOrUpdate"
	if (id.length === 0) {
		body = { apiName, apiURL, active }
	} else {
		body = {
			id,
			apiName,
			apiURL,
			active,
		}
	}
	try {
		return await axios.post(url, body, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const linkRoleAndPermissionApi = async (
	baseUrl,
	roleId,
	permissionId,
	headers
) => {
	let body = { roleId, permissionId }
	let url = baseUrl + "/adminUser/rolePermission/saveOrUpdate"

	try {
		return await axios.post(url, body, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getAllRolesApi = async (baseUrl, headers) => {
	let url = baseUrl + "/adminUser/role/getAll"
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getAllPermissionsApi = async (baseUrl, headers) => {
	let url = baseUrl + "/adminUser/permission/getAll"
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getPermissionByRoleApi = async (baseUrl, roleId, headers) => {
	let url = baseUrl + `/adminUser/rolePermission/getByRoleId?roleId=${roleId}`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getCurrentRolePermissionsDetailsApi = async (baseUrl, headers) => {
	let url = baseUrl + `/adminUser/rolePermission/getAll`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getActiveRolesApi = async (baseUrl, headers) => {
	let url = baseUrl + `/adminUser/role/getAllActive`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const getActivePermissionsApi = async (baseUrl, headers) => {
	let url = baseUrl + `/adminUser/permission/getAllActive`
	try {
		return await axios.get(url, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}

export const assignRoleApi = async (baseUrl, phoneNumber, roleId, headers) => {
	let newNumber = "92" + phoneNumber
	let body = { phoneNumber: newNumber, roleId }
	let url = baseUrl + "/adminUser/linkRole"

	try {
		return await axios.post(url, body, {
			headers,
		})
	} catch (error) {
		return error?.response
	}
}
