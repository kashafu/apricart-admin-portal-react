import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

const updateToken = () => {
	const cookies = new Cookies();
	let token = cookies.get("cookies-token");
	return token;
};

export const getGeneralApiParams = () => {
	const cookies = new Cookies();
	let clientType = "apricart";
	let prodType = "";
	let orderType = "";
	// let baseUrl = "https://stag.apricart.pk/v1";
	let baseUrl = "http://192.168.30.78:8080/v1";
	let token = updateToken();
	let city = cookies.get("cities") === null ? "karachi" : cookies.get("cities");
	let selectedAddress = cookies.get("selected-address");
	let latitude = 0;
	let longitude = 0;
	let userId = cookies.get("cookies-userId");
	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "http://localhost:4000",
	};
	if (token) {
		headers = {
			...headers,
			Authorization: "Bearer " + token,
		};
	}
	let isUserInitialized = cookies.get("user-initialized") ? true : false;
	// if user is logged in
	// if (token) {
	//     // if user has a selected address, use that addresses's latitude longitude
	//     if(selectedAddress){
	//         latitude = selectedAddress.mapLat
	//         longitude = selectedAddress.mapLong
	//     }
	//     // if no address is selected or no address has been added, use default lat long 0
	//     headers = {
	//         ...headers,
	//         Authorization: "Bearer " + token
	//     }
	// }
	// // if its a guest
	// else {
	//     // if location enabled, use browser latitude and longitude, if not enabled, send 0 by default
	//     if (!isNode) {
	//         navigator.geolocation.getCurrentPosition((position) => {
	//             latitude = position.coords.latitude
	//             longitude = position.coords.longitude
	//         })
	//     }
	// }

	return {
		city,
		selectedAddress,
		latitude,
		longitude,
		userId,
		headers,
		token,
		prodType,
		orderType,
		clientType,
		isUserInitialized,
		baseUrl,
	};
};

// Check status is a function to display toasts based on whether the request was successful
// if it succeeds, it returns true, this is used to set information in the render components
export const checkStatus = (
	res,
	successMessage,
	errorMessage,
	successTimer,
	errorTimer
) => {
	// console.log(res);
	if (res === undefined) {
		displayErrorToast("An Error occured. Contact backend services.", 3000);
		return false;
	}
	if (res.status === 200) {
		if (successMessage === "") return true;
		toast.success(successMessage || res.data.message, {
			position: "top-center",
			autoClose: successTimer || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			theme: "dark",
		});
		return true;
	} else if (res.status === 0) {
		toast.error(
			errorMessage ||
				"An unknown error occured. Please try again later or contact backend services",
			{
				position: "top-center",
				autoClose: errorTimer || 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
			}
		);
		return false;
	} else if (res.status === 400) {
		toast.error(
			errorMessage ||
				"Make sure all the fields are filled. Make sure the values entered are also valid",
			{
				position: "top-center",
				autoClose: errorTimer || 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
			}
		);
		return false;
	} else if (res.status === 401) {
		toast.error(errorMessage || "You are unauthorized to access this feature", {
			position: "top-center",
			autoClose: errorTimer || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			theme: "dark",
			toastId: "UnAuth001202",
		});
		Router.push("/login");
		return false;
	} else if (res.status !== 200) {
		toast.error(errorMessage || res.data.message, {
			position: "top-center",
			autoClose: errorTimer || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			theme: "dark",
		});
		return false;
	}
};

export function displayErrorToast(message, timer, position, toastId) {
	toast.error(message || "An Error Occured", {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: toastId || null,
	});
}
export function displaySuccessToast(message, timer, position, toastId) {
	toast.success(message || "Success", {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: toastId || null,
	});
}
export function displayInfoToast(message, timer, position, toastId) {
	toast.info(message, {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: toastId || null,
	});
}

export const logOutRemoveCookies = () => {
	const cookies = new Cookies();
	cookies.remove("cookies-token", { path: "/" });
	cookies.remove("cookies-userId", { path: "/" });
	cookies.remove("cookies-name", { path: "/" });
	cookies.remove("cookies-phoneNumber", { path: "/" });
	cookies.remove("cookies-email", { path: "/" });
	cookies.remove("user-initialized", { path: "/" });
	localStorage.clear();
	getGeneralApiParams();
};

const imgAllowedTypes = ["image/png", "image/gif", "image/jpeg", "image/jpg"];

const fileAllowedTypes = ["application/pdf", "text/csv", "video/mp4"];

export const validateImage = (image) => {
	if (image === undefined) return;
	if (imgAllowedTypes.includes(image.type)) return true;
	else return false;
};
export const validateFile = (file) => {
	if (file === undefined) return;
	if (fileAllowedTypes.includes(file.type)) return true;
	else return false;
};
export const updateRen = (setRen) => {
	setRen(Math.random().toString(36));
};
export const sortAscending = (array) => {
	let newArray = array.sort((a, b) => a.id - b.id);
	return newArray;
};
export const sortDescending = (array) => {
	let newArray = array.sort((a, b) => b.id - a.id);
	return newArray;
};
