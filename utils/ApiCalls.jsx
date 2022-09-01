import FileSaver, { saveAs } from "file-saver";

import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";

export const loginApi = async (
	baseUrl,
	city,
	userId,
	phoneNumber,
	password,
	setErrorMessage,
	router,
	headers
) => {
	const cookies = new Cookies();
	let url =
		baseUrl + "/auth/open/login?city=" + city + "&lang=en&client_type=apricart";
	let body = {
		guestuserid: userId,
		username: "92" + phoneNumber,
		password,
	};
	function useRegex(input) {
		let regex = /Abdullah/i;
		return regex.test(input);
	}
	try {
		let response = await axios.post(url, body, {
			headers,
		});

		if (response.data.status == 1) {
			if (response.data.data.portal === false) {
				return {
					data: {
						status: 2,
						message: "You are unauthorized to access this feature",
					},
				};
			}
			cookies.set("cookies-token", response.data.data.token);
			cookies.set("cookies-name", response.data.data.name);
			cookies.set("cookies-email", response.data.data.email);
			cookies.set("cookies-phoneNumber", response.data.data.phoneNumber);
			cookies.set("cookies-userId", response.data.data.userId);
			setErrorMessage("");
			router.push("/dashboard");
			return response;
		} else {
			return response;
		}
	} catch (err) {
		return { data: { err, status: 400 } };
	}
};

export const sendOtpApi = async (baseUrl, phoneNumber, headers) => {
	const url = baseUrl + "/auth/open/otp";
	let body = {
		phoneNumber: "92" + phoneNumber,
	};
	try {
		let response = await axios.post(url, body, {
			headers,
		});
		if (response.data.status == 1) {
			console.log(response.data.message);
		} else {
			console.log(response.data.message);
			console.log("enter a phone number for otp request to reset password");
		}
	} catch (e) {
		console.log(e);
	}
};

export const resetPasswordApi = async (
	baseUrl,
	phoneNumber,
	password,
	otp,
	headers
) => {
	let url = baseUrl + "/auth/open/password/forgot?lang=en&client_type=apricart";
	let body = {
		phoneNumber: "92" + phoneNumber,
		password: password,
		otp: otp,
	};
	try {
		let response = await axios.post(url, body, {
			headers,
		});
		if (response.data.status == 1) {
			// toast.success(response.data.message);
		}
	} catch (error) {
		return error?.response;
		// toast.error(error?.response?.message);
	}
};

export const uploadImagesApi = async (baseUrl, images) => {
	let url = baseUrl + "/options/uploads";
	try {
		return await axios.post(url, images, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		console.log(error);
		return {
			data: {
				error,
			},
		};
	}
};

export const offerSaveApi = async (baseUrl, input, headers) => {
	const { price, buying, buyingCondition, expiry, products, categories } =
		input;
	let newExp = expiry.concat("T00:00:00Z");
	let url = baseUrl + "/offers/save?city=karachi&lang=en";
	let body = {
		price,
		buying,
		buyingCondition,
		expiry: newExp,
		products,
		categories,
	};
	try {
		return await axios.post(url, body, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

export const downloadUsersApi = async (baseUrl, headers) => {
	const url = baseUrl + "/admin/download/users";

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD");
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				FileSaver.saveAs(blob.data, `User_Report_${dateString1}.csv`);
				return blob;
			});
	} catch (error) {
		console.log(error);
	}
};

export const downloadProductsApi = async (baseUrl, headers, summary) => {
	const url = baseUrl + `/admin/download/products?summary=${summary}`;

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD");
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(blob.data, `Products_Report_${dateString1}.csv`);
				return blob;
			});
	} catch (error) {
		console.log(error);
	}
};

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
		`/admin/download/orders?cityid=${cityId}&from=${fromDate}&to=${toDate}&skus=${skus}`;

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD");
	try {
		axios
			.get(url, {
				headers: { ...headers, "Content-Type": "text/csv" },
				responseType: "blob",
			})
			.then((blob) => {
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
				FileSaver.saveAs(blob.data, `Orders_Report_${dateString1}.csv`);
				return blob;
			});
	} catch (error) {
		return error.response;
	}
};

export const downloadAbundantCartApi = async (baseUrl, horas, headers) => {
	const url =
		baseUrl + `/admin/download/abundantcart?interval_in_hours=${horas}`;
	const dateString1 = moment(Date.now()).format("YYYY-MM-DD");
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
				);
				return blob;
			});
	} catch (error) {
		console.log(error);
	}
};

export const updateProductCSVApi = async (baseUrl, apiToken, file, headers) => {
	let entries = file.entries().next();
	const { value } = entries;

	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		};
	}
	let url = baseUrl + `/admin/product/csv/update?apitoken=${apiToken}`;
	try {
		return await axios.post(url, file, {
			...headers,
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		return error?.response;
	}
};

export const addUpdateProductCSVApi = async (
	baseUrl,
	apiToken,
	file,
	headers
) => {
	let entries = file.entries().next();
	const { value } = entries;
	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		};
	}
	let url = baseUrl + `/admin/product/csv/addupdate?apitoken=${apiToken}`;
	try {
		return await axios.post(url, file, {
			...headers,
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		return error?.response;
	}
};

export const getAllBannersApi = async (baseUrl, headers) => {
	const url = baseUrl + `/offers/banners?city=karachi&lang=en`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteBannerApi = async (baseUrl, id, headers) => {
	const url = baseUrl + `/offers/banners/remove`;
	try {
		return await axios
			.post(
				url,
				{ id },
				{
					headers,
				}
			)
			.then((response) => {
				return response;
			});
	} catch (error) {
		console.log(error);
	}
};

export const saveBannersApi = async (baseUrl, banner) => {
	let url = baseUrl + "/offers/banners/save";
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		return error?.response;
	}
};

export const updateBannersApi = async (baseUrl, newBanner, headers) => {
	let url = baseUrl + "/offers/banners/save";
	let body = {
		id: newBanner.id,
		bannerUrlWeb: newBanner.bannerUrlWeb,
		bannerUrlApp: newBanner.bannerUrlApp,
	};
	try {
		await axios
			.post(url, body, {
				headers,
			})
			.then((response) => {
				console.log(response);
				return response;
			});
	} catch (error) {
		return error?.response;
	}
};

export const updateTickerApi = async (baseUrl, text, headers) => {
	let url =
		baseUrl +
		`/admin/ticker/update?text=${text}&prod_type=cus&order_type=delivery&city=karachi`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

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
		`/admin/notification?type=${type}&value=${value}&title=${title}&message=${message}&city=${city}&to=${to}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

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
		`/admin/iscontinue/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

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
		`/admin/recommended/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

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
		`/admin/web/update?text=${text}&prod_type=${prodType}&order_type=${orderType}&city=${city}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

export const productStockDetailAdminApi = async (
	baseUrl,
	id,
	city,
	headers
) => {
	let url =
		baseUrl + `/admin/products/stock/detail?id=${id}&city=${city}&lang=en`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

export const productAdminDetailApi = async (
	baseUrl,
	id,
	city,
	warehouse_id,
	headers
) => {
	let url =
		baseUrl +
		`/admin/products/detail?id=${id}&city=${city}&lang=en&warehouse_id=${warehouse_id}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

export const popupRedirectionUpdateApi = async (baseUrl, banner, headers) => {
	let url = baseUrl + "/admin/popup/redirection/update";
	try {
		return await axios.post(url, banner, {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		return error?.response;
	}
};

export const csrOrderCancelApi = async (
	baseUrl,
	apitoken,
	orderId,
	headers
) => {
	let url = baseUrl + `/order/cancel?apitoken=${apitoken}&orderid=${orderId}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

export const csrOrderCompleteApi = async (
	baseUrl,
	apitoken,
	orderId,
	headers
) => {
	let url = baseUrl + `/order/complete?apitoken=${apitoken}&orderid=${orderId}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error?.response;
	}
};

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
	let cancelPrevRequest;

	//Check if there are any previous pending requests
	if (typeof cancelPrevRequest != typeof undefined) {
		cancelPrevRequest.cancel("Operation canceled due to new request.");
	}

	//Save the cancel token for the current request
	cancelPrevRequest = axios.CancelToken.source();

	let url =
		baseUrl +
		`/admin/products/search?page=${page}&size=${size}&term=${term}&category=${category}&city=${city}&lang=en&userid=${userId}`;
	try {
		return await axios.get(url, {
			headers,
			// cancelToken: cancelPrevRequest.token,
		});
	} catch (error) {
		return error?.response;
	}
};

export const productPriceUpdatedLast24HoursApi = async (
	baseUrl,
	time,
	headers
) => {
	const url =
		baseUrl +
		`/admin/download/products/price/updatedinlast24hours?interval_in_hours=${time}`;

	const dateString1 = moment(Date.now()).format("YYYY-MM-DD");
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
				);
				return blob;
			});
	} catch (error) {
		console.log(error);
	}
};

export const productPositionDeleteAdminApi = async (
	baseUrl,
	id,
	prodType,
	orderType,
	headers
) => {
	const url =
		baseUrl +
		`/admin/products/position/remove?id=${id}&prod_type=${prodType}&order_type=${orderType}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		return error.response;
	}
};

export const updateProductPositionCSVApi = async (baseUrl, files, headers) => {
	let entries = files.entries().next();
	const { value } = entries;

	if (value[1] === "undefined" || value[1] === "") {
		return {
			status: 404,
			data: {
				message: "Please submit a file to proceed",
			},
		};
	}
	let url = baseUrl + `/admin/product/position/csv/update	`;
	try {
		return await axios.post(url, files, {
			...headers,
			"Content-Type": "multipart/form-data",
		});
	} catch (error) {
		return error?.response;
	}
};

export const productPositionDetailApi = async (
	baseUrl,
	prodType,
	orderType,
	type,
	headers
) => {
	const url =
		baseUrl +
		`/admin/products/position/detail?prod_type=${prodType}&order_type=${orderType}&type=${type}`;
	try {
		return await axios.get(url, {
			headers,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addCategoryApi = async (
	baseUrl,
	img,
	parentId,
	name,
	position,
	headers
) => {
	console.log(img);
	let body = {
		category_image: img,
		parent_id: parentId,
		name,
		position,
	};
	let url = baseUrl + "/admin/category/add";
	try {
		await axios
			.post(url, body, {
				headers,
			})
			.then((response) => {
				console.log(response);
				return response;
			});
	} catch (error) {
		return error?.response;
	}
};

export const updateCategoryApi = async (
	baseUrl,
	img,
	parentId,
	name,
	position,
	headers
) => {
	let body = {
		img,
		parentId,
		name,
		position,
	};
	let url = baseUrl + "/admin/category/update";
	try {
		await axios
			.post(url, body, {
				headers,
			})
			.then((response) => {
				console.log(response);
				return response;
			});
	} catch (error) {
		return error?.response;
	}
};
