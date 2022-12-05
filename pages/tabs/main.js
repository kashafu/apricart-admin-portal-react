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
import UpdateCategoryImageAPIComponent from "../../components/EachAPI/categories/UpdateCategoryImageAPIComponent";
import UpdateCategoryBannerAPIComponent from "../../components/EachAPI/categories/UpdateCategoryBannerAPIComponent";
import SaveBannersAPIComponent from "../../components/EachAPI/banners/SaveBannersAPIComponent";
import BannersAPIComponent from "../../components/EachAPI/banners/BannersAPIComponent";

const MainTabComponent = () => {
	const dispatch = useDispatch();
	const tabs = useSelector((state) => state.recent.tabs);
	const each = useSelector((state) => state.recent.recents);
	const [allTabs, setAllTabs] = useState(tabs);
	const [selected, setSelected] = useState(each[0]?.name);

	const handleSelect = (each) => {
		setSelected(each.name);
		dispatch(addToRecent(each));
	};

	return (
		<section>
			<div className="m-4">
				<h1>{each[0]?.category} Management</h1>
			</div>
			<section className="flex cursor-pointer border-b-slate-300 border-b-[1px] overflow-x-auto">
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
				{selected === "Create a new Category" && <AddNewCategoryAPIComponent />}
				{selected === "Update Category" && <UpdateCategoryAPIComponent />}
				{selected === "Products Search" && <ProductAdminSearchAPIComponent />}
				{selected === "Products Detail" && <ProductAdminDetailAPIComponent />}
				{selected === "Product Position" && (
					<ProductPositionDetailAdminAPIComponent />
				)}
				{selected === "Products Stock Detail" && (
					<ProductStockDetailAdminAPIComponent />
				)}
				{selected === "Products Report Download" && (
					<GetProductReportsAPIComponent />
				)}
				{selected === "Products Out of stock Report" && (
					<GetProductsOutOfStockAPIComponent />
				)}
				{selected === "Updated in Last 24 Hours" && (
					<ProductPriceUpdatedLast24hAPIComponent />
				)}
				{selected === "Total Users Report" && <GetUsersReportsAPIComponent />}
				{selected === "Total Orders Report" && <GetOrdersReportsAPIComponent />}
				{selected === "Abundant Cart Report" && (
					<GetAbundantCartReportsAPIComponent />
				)}
				{selected === "Product Position CSV" && (
					<AddnUpdateProductPositionCSVAPIComponent />
				)}
				{selected === "Create a new Coupon" && <AddnUpdateCouponAPIComponent />}
				{selected === "Offer Save" && <OfferSaveAPIComponent />}
				{selected === "Thank you page Banner update" && (
					<ThankyouImageAddUpdateAPIComponent />
				)}
				{selected === "Category Image Update" && (
					<UpdateCategoryImageAPIComponent />
				)}
				{selected === "Category Banner Update" && (
					<UpdateCategoryBannerAPIComponent />
				)}
				{selected === "Banner Save" && <SaveBannersAPIComponent />}
				{selected === "Banner Remove" && <BannersAPIComponent />}
			</section>
		</section>
	);
};

export default MainTabComponent;
