import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getGeneralApiParams = () => {
	const cookies = new Cookies();
	let clientType = "apricart";
	let prodType = "";
	let orderType = "";
	let baseUrl = "https://stag.apricart.pk/v1";
	let token = cookies.get("cookies-token");
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
	if (res.status === 200) {
		toast.success(successMessage || res.data.message, {
			position: "top-center",
			autoClose: successTimer || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			theme: "dark",
			toastId: "successId",
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
				toastId: "errorId",
			}
		);
		return false;
	} else if (res.status === 400) {
		toast.error(
			errorMessage || "Make sure all the fields are filled with valid inputs",
			{
				position: "top-center",
				autoClose: errorTimer || 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: "errorId",
			}
		);
		return false;
	} else if (res.status !== 200) {
		toast.error(errorMessage || res.data.message, {
			position: "top-center",
			autoClose: errorTimer || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			theme: "dark",
			toastId: "errorId",
		});
		return false;
	}
};

export function displayErrorToast(message, timer, position) {
	toast.error(message || "An Error Occured", {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: "genErrorId",
	});
}
export function displaySuccessToast(message, timer, position) {
	toast.success(message || "Success", {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: "genSuccessId",
	});
}
export function displayInfoToast(message, timer, position) {
	toast.success(message, {
		position: position || "top-center",
		autoClose: timer || 1500,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "dark",
		toastId: "genInfoId",
	});
}
