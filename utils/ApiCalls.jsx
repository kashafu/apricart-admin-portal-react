import axios from "axios";
import Cookies from "universal-cookie";
import fileDownload from "js-file-download";
import FileSaver, { saveAs } from "file-saver";
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
	try {
		let response = await axios.post(url, body, {
			headers,
		});
		console.log(response);
		if (response.data.status == 1) {
			cookies.set("cookies-token", response.data.data.token);
			cookies.set("cookies-name", response.data.data.name);
			cookies.set("cookies-email", response.data.data.email);
			cookies.set("cookies-phoneNumber", response.data.data.phoneNumber);
			cookies.set("cookies-userId", response.data.data.userId);
			setErrorMessage("");
			router.push("/dashboard");
			return response;
		} else {
			setErrorMessage(response.message);
			return response;
		}
	} catch (err) {
		setErrorMessage(err.response.data.message);
		return err;
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
			toast.success(response.data.message);
		}
	} catch (error) {
		console.log(error?.response);
		toast.error(error?.response?.message);
	}
};

export const uploadImagesApi = async (baseUrl, images, headers) => {
	let url = baseUrl + "/options/uploads";
	try {
		await axios
			.post(url, images, {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			})
			.then((response) => {
				console.log(response);
				return response;
			});
	} catch (error) {
		console.log(error?.response);
	}
};

export const offerSaveApi = async (baseUrl, input, headers) => {
	const { price, buying, buyingCondition, expiry, products, categories } =
		input;
	console.log(input);
	let url = baseUrl + "/offers/save?city=karachi&lang=en&";
	let body = {
		price,
		buying,
		buyingCondition,
		expiry,
		products,
		categories,
	};
	try {
		let response = await axios.post(url, body, {
			headers,
		});
		if (response.data.status == 1) {
			console.log(response);
			return response;
		}
	} catch (error) {
		console.log(error?.response);
		// toast.error(error?.response?.message);
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
				// fileDownload(blob.data, `User_Report_${dateString1}.csv`);
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
		console.log(error);
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
		await axios.post(url, id, {
			headers,
		});
	} catch (error) {
		console.log(error);
	}
};
