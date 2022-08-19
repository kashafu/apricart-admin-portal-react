import Cookies from "universal-cookie";

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
	let userId =
		cookies.get("guestUserId") === null ? "abc123" : cookies.get("guestUserId");
	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};
	if (token) {
		console.log(token);
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
