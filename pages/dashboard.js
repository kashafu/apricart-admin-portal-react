import React, { useState } from "react";

import BannersAPIComponent from "../components/EachAPI/banners/BannersAPIComponent";
import SaveBannersAPIComponent from "../components/EachAPI/banners/SaveBannersAPIComponent";
import CsrOrderCancelAPIComponent from "../components/EachAPI/CsrOrderCancelAPIComponent";

import GetAbundantCartReportsAPIComponent from "../components/EachAPI/downloads/GetAbundantCartReportsAPIComponent";
import GetOrdersReportsAPIComponent from "../components/EachAPI/downloads/GetOrdersReportsAPIComponent";
import GetProductReportsAPIComponent from "../components/EachAPI/downloads/GetProductReportsAPIComponent";
import GetUserReportsAPIComponent from "../components/EachAPI/downloads/GetUsersReportsAPIComponent";
import ImageUploadAPIComponent from "../components/EachAPI/ImageUploadAPIComponent";
import IsContinueAPIComponent from "../components/EachAPI/isContinueAPIComponent";
import NewNotificationSendAPIComponent from "../components/EachAPI/NewNotificationSendAPIComponent";
import OfferSaveAPIComponent from "../components/EachAPI/OfferSaveAPIComponent";
import PopupRedirectionUpdateAPIComponent from "../components/EachAPI/PopupRedirectionUpdateAPIComponent";
import ProductAdminDetailAPIComponent from "../components/EachAPI/ProductAdminDetailAPIComponent";
import ProductAdminSearchAPIComponent from "../components/EachAPI/ProductAdminSearchAPIComponent";
import ProductStockDetailAdminAPIComponent from "../components/EachAPI/ProductStockDetailAdminAPIComponent";
import RecommendedUpdateAPIComponent from "../components/EachAPI/RecommendedUpdateAPIComponent";
import TickerUpdateAPIComponent from "../components/EachAPI/TickerUpdateAPIComponent";
import UpdateProductCSVAPIComponent from "../components/EachAPI/updateProductCSVAPIComponent";
import CustomImageInput from "../components/Misc/CustomImageInput";
import ProfileViewComponent from "../components/ProfileViewComponent";

const Dashboard = () => {
	const [profileDisplay, setProfileDisplay] = useState(false);
	return (
		<div>
			{/* <button onClick={()=>setProfileDisplay(!profileDisplay)}>XD</button> */}
			{/* <ProfileViewComponent profileDisplay={profileDisplay} setProfileDisplay={setProfileDisplay}/> */}
			{/* <ImageUploadAPIComponent/> */}
			{/* <OfferSaveAPIComponent /> */}
			{/* <GetUserReportsAPIComponent /> */}
			{/* <GetProductReportsAPIComponent /> */}
			{/* <GetOrdersReportsAPIComponent /> */}
			{/* <GetAbundantCartReportsAPIComponent /> */}
			<BannersAPIComponent />
			{/* <SaveBannersAPIComponent /> */}
			{/* <TickerUpdateAPIComponent /> */}
			{/* <NewNotificationSendAPIComponent /> */}
			{/* <IsContinueAPIComponent /> */}
			{/* <RecommendedUpdateAPIComponent /> */}
			{/* <ProductStockDetailAdminAPIComponent /> */}
			{/* <ProductAdminDetailAPIComponent /> */}
			{/* <PopupRedirectionUpdateAPIComponent /> */}
			{/* <CsrOrderCancelAPIComponent /> */}
			{/* <ProductAdminSearchAPIComponent /> */}
			{/* <UpdateProductCSVAPIComponent /> */}
		</div>
	);
};

export default Dashboard;
