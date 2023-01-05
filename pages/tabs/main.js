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
import ViewAllCategories from "../../components/EachAPI/categories/ViewAllCategories";
import UpdateProductCSVAPIComponent from "../../components/EachAPI/products/UpdateProductCSVAPIComponent";
import OfferRemoveAPIComponent from "../../components/EachAPI/other/OfferRemoveAPIComponent";
import UpdateProductPositionCSVAPIComponent from "../../components/EachAPI/products/UpdateProductPositionCSVAPIComponent";
import AddnUpdateProductCSVAPIComponent from "../../components/EachAPI/products/AddnUpdateProductCSVAPIComponent";
import UploadProductImageAPIComponent from "../../components/EachAPI/products/UploadProductImageAPIComponent";
import ProductIsActiveAPIComponent from "../../components/EachAPI/products/ProductIsActiveAPIComponent";
import EditBannersAPIComponent from "../../components/EachAPI/banners/EditBannersAPIComponent";

const MainTabComponent = () => {
	const dispatch = useDispatch();
	const tabs = useSelector((state) => state.recent.tabs);
	const each = useSelector((state) => state.recent.recents);
	const [allTabs, setAllTabs] = useState(tabs);
	const [selected, setSelected] = useState(each[0]?.id || allTabs[0]?.id);

	const handleSelect = (each) => {
		setSelected(each.id);
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
						key={each.id}
						className={
							selected === each.id
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
				{/* CATEGORY */}
				{selected === 0 && <ViewAllCategories />}
				{selected === 21 && <AddNewCategoryAPIComponent />}
				{selected === 22 && <UpdateCategoryAPIComponent />}
				{selected === 25 && <UpdateCategoryImageAPIComponent />}
				{selected === 26 && <UpdateCategoryBannerAPIComponent />}

				{/* PRODUCTS */}
				{selected === 1 && <ProductAdminSearchAPIComponent />}
				{selected === 2 && <ProductAdminDetailAPIComponent />}
				{selected === 3 && <ProductStockDetailAdminAPIComponent />}
				{selected === 5 && <UpdateProductCSVAPIComponent />}
				{selected === 6 && <ProductIsActiveAPIComponent />}
				{selected === 8 && <ProductPositionDetailAdminAPIComponent />}
				{selected === 9 && <UpdateProductPositionCSVAPIComponent />}
				{selected === 32 && <AddnUpdateProductCSVAPIComponent />}
				{selected === 33 && <UploadProductImageAPIComponent />}

				{/* REPORTS */}
				{selected === 4 && <GetProductReportsAPIComponent />}
				{selected === 10 && <GetProductsOutOfStockAPIComponent />}
				{selected === 11 && <ProductPriceUpdatedLast24hAPIComponent />}
				{selected === 13 && <GetUsersReportsAPIComponent />}
				{selected === 14 && <GetOrdersReportsAPIComponent />}
				{selected === 31 && <GetAbundantCartReportsAPIComponent />}

				{/* COUPONS */}
				{selected === 12 && <AddnUpdateCouponAPIComponent />}

				{/* BANNER */}
				{selected === 15 && <ThankyouImageAddUpdateAPIComponent />}
				{selected === 29 && <SaveBannersAPIComponent />}
				{selected === 30 && <BannersAPIComponent />}
				{/* {selected === 30 && <EditBannersAPIComponent />} */}

				{/* ALERTS & ANNOUNCEMENT */}
				{selected === 16 && <NewNotificationSendAPIComponent />}
				{selected === 17 && <TickerUpdateAPIComponent />}
				{selected === 18 && <IsContinueAPIComponent />}
				{selected === 19 && <RecommendedUpdateAPIComponent />}
				{selected === 20 && <WebUpdateAPIComponent />}
				{selected === 27 && <PopupRedirectionUpdateAPIComponent />}
				{selected === 28 && <UpdateWelcomeVideoAPIComponent />}

				{/* OFFERS MANAGEMENT */}
				{selected === 23 && <OfferSaveAPIComponent />}
				{selected === 24 && <OfferRemoveAPIComponent />}

				{/* ADMIN MANAGEMENT */}

			</section>
		</section>
	);
};

export default MainTabComponent;
