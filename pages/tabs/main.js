import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToRecent, selectTabs } from "../../Redux/Recents/recentsSlice";

import AddNewCategoryAPIComponent from "../../components/EachAPI/categories/AddNewCategoryAPIComponent";
import UpdateCategoryAPIComponent from "../../components/EachAPI/categories/UpdateCategoryAPIComponent";
import ProductAdminSearchAPIComponent from "../../components/EachAPI/products/ProductAdminSearchAPIComponent";
import ProductAdminDetailAPIComponent from "../../components/EachAPI/products/ProductAdminDetailAPIComponent";
import ProductStockDetailAdminAPIComponent from "../../components/EachAPI/products/ProductStockDetailAdminAPIComponent";
import ProductPositionDetailAdminAPIComponent from "../../components/EachAPI/products/ProductPositionDetailAdminAPIComponent";
import AddnUpdateProductPositionCSVAPIComponent from "../../components/EachAPI/products/AddnUpdateProductPositionCSVAPIComponent";
import GetProductReportsAPIComponent from "../../components/EachAPI/downloads/GetProductReportsAPIComponent";
import GetProductsOutOfStockAPIComponent from "../../components/EachAPI/downloads/GetProductsOutOfStockAPIComponent";
import GetUsersReportsAPIComponent from "../../components/EachAPI/downloads/GetUsersReportsAPIComponent";
import GetOrdersReportsAPIComponent from "../../components/EachAPI/downloads/GetOrdersReportsAPIComponent";
import GetAbundantCartReportsAPIComponent from "../../components/EachAPI/downloads/GetAbundantCartReportsAPIComponent";
import ProductPriceUpdatedLast24hAPIComponent from "../../components/EachAPI/products/ProductPriceUpdatedLast24hAPIComponent";
import AddnUpdateCouponAPIComponent from "../../components/EachAPI/other/AddnUpdateCouponAPIComponent";
import OfferSaveAPIComponent from "../../components/EachAPI/other/OfferSaveAPIComponent";
import ThankyouImageAddUpdateAPIComponent from "../../components/EachAPI/other/ThankyouImageAddUpdateAPIComponent";
import UpdateWelcomeVideoAPIComponent from "../../components/EachAPI/other/UpdateWelcomeVideoAPIComponent";
import PopupRedirectionUpdateAPIComponent from "../../components/EachAPI/other/PopupRedirectionUpdateAPIComponent";
import WebUpdateAPIComponent from "../../components/EachAPI/other/WebUpdateAPIComponent";
import RecommendedUpdateAPIComponent from "../../components/EachAPI/other/RecommendedUpdateAPIComponent";
import IsContinueAPIComponent from "../../components/EachAPI/other/IsContinueAPIComponent";
import TickerUpdateAPIComponent from "../../components/EachAPI/other/TickerUpdateAPIComponent";
import NewNotificationSendAPIComponent from "../../components/EachAPI/other/NewNotificationSendAPIComponent";
import UpdateCategoryImageAPIComponent from "../../components/EachAPI/categories/UpdateCategoryImageAPIComponent";
import UpdateCategoryBannerAPIComponent from "../../components/EachAPI/categories/UpdateCategoryBannerAPIComponent";
import SaveBannersAPIComponent from "../../components/EachAPI/banners/SaveBannersAPIComponent";
import BannersAPIComponent from "../../components/EachAPI/banners/BannersAPIComponent";
import GetAllCategories from "../../components/EachAPI/categories/GetAllCategories";
import UpdateProductCSVAPIComponent from "../../components/EachAPI/products/UpdateProductCSVAPIComponent";

const MainTabComponent = () => {
	const dispatch = useDispatch();
	const tabs = useSelector((state) => state.recent.tabs);
	const each = useSelector((state) => state.recent.recents);
	const [allTabs, setAllTabs] = useState(tabs);
	const [selected, setSelected] = useState(each[0]?.name || allTabs[0]?.name);

	const handleSelect = (each) => {
		setSelected(each.name);
		dispatch(addToRecent(each));
	};

	return (
		<section className="w-full">
			<div className="m-4">
				<h1>
					{each[0]?.category}{" "}
					<span className="font-semibold font-lato text-main-blue">
						Management
					</span>
				</h1>
			</div>
			<section className="w-full flex cursor-pointer border-b-slate-300 border-b-[1px] overflow-x-auto">
				{allTabs.map((each) => (
					<div
						key={each.endpoint}
						className={
							selected === each.name
								? "p-2 mx-2 border-b-main-blue border-b-[1px] text-main-blue shadow-inner duration-200 rounded-t-2xl"
								: "p-2 mx-2 duration-200 rounded-t-2xl"
						}
						onClick={() => handleSelect(each)}
					>
						{each.name}
					</div>
				))}
			</section>
			<section>
				{selected === "Add Category" && <AddNewCategoryAPIComponent />}
				{selected === "Update Category" && <UpdateCategoryAPIComponent />}
				{selected === "View Category" && <GetAllCategories />}
				{selected === "Products Search" && <ProductAdminSearchAPIComponent />}
				{selected === "Products Detail" && <ProductAdminDetailAPIComponent />}
				{selected === "Products Stock Detail" && (
					<ProductStockDetailAdminAPIComponent />
				)}
				{selected === "Position Details" && (
					<ProductPositionDetailAdminAPIComponent />
				)}
				{selected === "Products Report" && <GetProductReportsAPIComponent />}
				{selected === "Products Out Of Stock" && (
					<GetProductsOutOfStockAPIComponent />
				)}
				{selected === "Updates in last 24 Hours" && (
					<ProductPriceUpdatedLast24hAPIComponent />
				)}
				{selected === "Total Users" && <GetUsersReportsAPIComponent />}
				{selected === "Total Orders" && <GetOrdersReportsAPIComponent />}
				{selected === "Abundant Cart" && <GetAbundantCartReportsAPIComponent />}
				{selected === "Product Position -CSV" && (
					<AddnUpdateProductPositionCSVAPIComponent />
				)}
				{selected === "Products Save - CSV" && <UpdateProductCSVAPIComponent />}
				{selected === "Add Coupon" && <AddnUpdateCouponAPIComponent />}
				{selected === "Offer Save" && <OfferSaveAPIComponent />}
				{selected === "Thank you page Banner" && (
					<ThankyouImageAddUpdateAPIComponent />
				)}
				{selected === "Category Image Update" && (
					<UpdateCategoryImageAPIComponent />
				)}
				{selected === "Category Banner Update" && (
					<UpdateCategoryBannerAPIComponent />
				)}
				{selected === "Save Banner" && <SaveBannersAPIComponent />}
				{selected === "Remove Banner" && <BannersAPIComponent />}
				{selected === "Push Notification" && (
					<NewNotificationSendAPIComponent />
				)}
				{selected === "Ticker Update" && <TickerUpdateAPIComponent />}
				{selected === "Is Continue" && <IsContinueAPIComponent />}
				{selected === "Recommended" && <RecommendedUpdateAPIComponent />}
				{selected === "Web" && <WebUpdateAPIComponent />}
				{selected === "Popup Screen Update" && (
					<PopupRedirectionUpdateAPIComponent />
				)}
				{selected === "Welcome Video Update" && (
					<UpdateWelcomeVideoAPIComponent />
				)}
			</section>
		</section>
	);
};

export default MainTabComponent;
