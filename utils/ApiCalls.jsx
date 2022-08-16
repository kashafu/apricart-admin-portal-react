import axios from "axios";
import Cookies from "universal-cookie";

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
