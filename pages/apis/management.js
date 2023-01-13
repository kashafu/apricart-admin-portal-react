import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToRecent, selectTabs } from "../../Redux/Recents/recentsSlice"

import AddNewCategoryAPIComponent from "../../components/EachAPI/categories/AddNewCategoryAPIComponent"
import UpdateCategoryAPIComponent from "../../components/EachAPI/categories/UpdateCategoryAPIComponent"
import ProductAdminSearchAPIComponent from "../../components/EachAPI/products/ProductAdminSearchAPIComponent"
import ProductAdminDetailAPIComponent from "../../components/EachAPI/products/ProductAdminDetailAPIComponent"
import ProductStockDetailAdminAPIComponent from "../../components/EachAPI/products/ProductStockDetailAdminAPIComponent"
import ProductPositionDetailAdminAPIComponent from "../../components/EachAPI/products/ProductPositionDetailAdminAPIComponent"
import AddnUpdateProductPositionCSVAPIComponent from "../../components/EachAPI/products/AddnUpdateProductPositionCSVAPIComponent"
import GetProductReportsAPIComponent from "../../components/EachAPI/downloads/GetProductReportsAPIComponent"
import GetProductsOutOfStockAPIComponent from "../../components/EachAPI/downloads/GetProductsOutOfStockAPIComponent"
import GetUsersReportsAPIComponent from "../../components/EachAPI/downloads/GetUsersReportsAPIComponent"
import GetOrdersReportsAPIComponent from "../../components/EachAPI/downloads/GetOrdersReportsAPIComponent"
import GetAbundantCartReportsAPIComponent from "../../components/EachAPI/downloads/GetAbundantCartReportsAPIComponent"
import ProductPriceUpdatedLast24hAPIComponent from "../../components/EachAPI/products/ProductPriceUpdatedLast24hAPIComponent"
import AddnUpdateCouponAPIComponent from "../../components/EachAPI/other/AddnUpdateCouponAPIComponent"
import OfferSaveAPIComponent from "../../components/EachAPI/other/OfferSaveAPIComponent"
import ThankyouImageAddUpdateAPIComponent from "../../components/EachAPI/other/ThankyouImageAddUpdateAPIComponent"
import UpdateWelcomeVideoAPIComponent from "../../components/EachAPI/other/UpdateWelcomeVideoAPIComponent"
import PopupRedirectionUpdateAPIComponent from "../../components/EachAPI/other/PopupRedirectionUpdateAPIComponent"
import WebUpdateAPIComponent from "../../components/EachAPI/other/WebUpdateAPIComponent"
import RecommendedUpdateAPIComponent from "../../components/EachAPI/other/RecommendedUpdateAPIComponent"
import IsContinueAPIComponent from "../../components/EachAPI/other/IsContinueAPIComponent"
import TickerUpdateAPIComponent from "../../components/EachAPI/other/TickerUpdateAPIComponent"
import NewNotificationSendAPIComponent from "../../components/EachAPI/other/NewNotificationSendAPIComponent"
import UpdateCategoryImageAPIComponent from "../../components/EachAPI/categories/UpdateCategoryImageAPIComponent"
import UpdateCategoryBannerAPIComponent from "../../components/EachAPI/categories/UpdateCategoryBannerAPIComponent"
import SaveBannersAPIComponent from "../../components/EachAPI/banners/SaveBannersAPIComponent"
import BannersAPIComponent from "../../components/EachAPI/banners/BannersAPIComponent"
import ViewAllCategories from "../../components/EachAPI/categories/ViewAllCategories"
import UpdateProductCSVAPIComponent from "../../components/EachAPI/products/UpdateProductCSVAPIComponent"
import OfferRemoveAPIComponent from "../../components/EachAPI/other/OfferRemoveAPIComponent"
import UpdateProductPositionCSVAPIComponent from "../../components/EachAPI/products/UpdateProductPositionCSVAPIComponent"
import AddnUpdateProductCSVAPIComponent from "../../components/EachAPI/products/AddnUpdateProductCSVAPIComponent"
import UploadProductImageAPIComponent from "../../components/EachAPI/products/UploadProductImageAPIComponent"
import ProductIsActiveAPIComponent from "../../components/EachAPI/products/ProductIsActiveAPIComponent"
import EditBannersAPIComponent from "../../components/EachAPI/banners/EditBannersAPIComponent"

// SUPER ADMIN COMPONENTS
import CreateAndUpdatePermissionsAPIComponent from "../../components/EachAPI/superAdmin/CreateAndUpdatePermissionsAPIComponent"
import AssignUserRoleAPIComponent from "../../components/EachAPI/superAdmin/AssignUserRoleAPIComponent"
import CreateAndUpdateRolesAPIComponent from "../../components/EachAPI/superAdmin/CreateAndUpdateRolesAPIComponent"
import GetAllActivePermissionsAPIComponent from "../../components/EachAPI/superAdmin/GetAllActivePermissionsAPIComponent"
import GetAllActiveRolesAPIComponent from "../../components/EachAPI/superAdmin/GetAllActiveRolesAPIComponent"
import GetAllPermissionsAPIComponent from "../../components/EachAPI/superAdmin/GetAllPermissionsAPIComponent"
import GetAllPermissionsByRoleAPIComponent from "../../components/EachAPI/superAdmin/GetAllPermissionsByRoleAPIComponent"
import GetAllPermissionsCurrentRoleAPIComponent from "../../components/EachAPI/superAdmin/GetAllPermissionsCurrentRoleAPIComponent"
import GetAllRolesAPIComponent from "../../components/EachAPI/superAdmin/GetAllRolesAPIComponent"
import LinkRoleAndPermissionsAPIComponent from "../../components/EachAPI/superAdmin/LinkRoleAndPermissionsAPIComponent"
import UpdatePermissionsAPIComponent from "../../components/EachAPI/superAdmin/UpdatePermissionsAPIComponent"
import ManagePermissions from "../../components/EachAPI/permissions/ManagePermissions"

const MainTabComponent = () => {
	const dispatch = useDispatch()
	const tabs = useSelector((state) => state.recent.tabs)
	const each = useSelector((state) => state.recent.recents)
	const [allTabs, setAllTabs] = useState(tabs)
	const [selected, setSelected] = useState(
		each[0]?.endpoint || allTabs[0]?.endpoint
	)

	const handleSelect = (each) => {
		setSelected(each.endpoint)
		dispatch(addToRecent(each))
	}

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
							selected === each.endpoint
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
				{selected === "/v1/category/view" && <ViewAllCategories />}
				{selected === "/v1/category/add" && (
					<AddNewCategoryAPIComponent />
				)}
				{selected === "/v1/category/update" && (
					<UpdateCategoryAPIComponent />
				)}
				{selected === "/v1/category/update/banner" && (
					<UpdateCategoryBannerAPIComponent />
				)}
				{selected === "/v1/category/update/image" && (
					<UpdateCategoryImageAPIComponent />
				)}

				{/* PRODUCTS */}
				{selected === "/v1/products/search" && (
					<ProductAdminSearchAPIComponent />
				)}
				{selected === 2 && <ProductAdminDetailAPIComponent />}
				{selected === 3 && <ProductStockDetailAdminAPIComponent />}
				{selected === 5 && <UpdateProductCSVAPIComponent />}
				{selected === 6 && <ProductIsActiveAPIComponent />}
				{selected === 8 && <ProductPositionDetailAdminAPIComponent />}
				{selected === 9 && <UpdateProductPositionCSVAPIComponent />}
				{selected === 32 && <AddnUpdateProductCSVAPIComponent />}
				{selected === 33 && <UploadProductImageAPIComponent />}

				{/* REPORTS */}
				{selected === "/v1/download/users" && (
					<GetUsersReportsAPIComponent />
				)}
				{selected === "/v1/download/products" && (
					<GetProductReportsAPIComponent />
				)}
				{selected === "/v1/download/outofstock" && (
					<GetProductsOutOfStockAPIComponent />
				)}
				{selected ===
					"/v1/download/products/price/updatedinlast24hours" && (
						<ProductPriceUpdatedLast24hAPIComponent />
					)}
				{selected === "/v1/download/orders" && (
					<GetOrdersReportsAPIComponent />
				)}
				{selected === "/v1/download/abundantcart" && (
					<GetAbundantCartReportsAPIComponent />
				)}

				{/* COUPONS */}
				{selected === "/v1/coupons/add" && (
					<AddnUpdateCouponAPIComponent />
				)}

				{/* BANNER */}
				{selected === 15 && <ThankyouImageAddUpdateAPIComponent />}
				{selected === "/v1/banners/add" && <SaveBannersAPIComponent />}
				{selected === 30 && <BannersAPIComponent />}
				{/* {selected === 30 && <EditBannersAPIComponent />} */}

				{/* ALERTS & ANNOUNCEMENT */}
				{selected === "/v1/misc/ticker" && <TickerUpdateAPIComponent />}
				{selected === "/v1/misc/notification" && (
					<NewNotificationSendAPIComponent />
				)}
				{selected === "/v1/misc/isContinue" && (
					<IsContinueAPIComponent />
				)}
				{selected === "/v1/misc/recommended" && (
					<RecommendedUpdateAPIComponent />
				)}
				{selected === 20 && <WebUpdateAPIComponent />}
				{selected === 27 && <PopupRedirectionUpdateAPIComponent />}
				{selected === "/v1/misc/welcomevideo" && (
					<UpdateWelcomeVideoAPIComponent />
				)}
				{selected === "/v1/misc/thankyouimage" && <ThankyouImageAddUpdateAPIComponent />}

				{/* OFFERS MANAGEMENT */}
				{selected === "/v1/offers/add" && <OfferSaveAPIComponent />}
				{selected === "/v1/offers/remove" && (
					<OfferRemoveAPIComponent />
				)}
				{selected === "/v1/offers/all" && <p></p>}
				{selected === "/v1/offers/detail" && <p></p>}

				{/* ADMIN MANAGEMENT */}
				{/* TODO ADd a is update field which will take id if u wanna update */}
				{selected === "/v1/adminUser/role/saveOrUpdate" && (
					<CreateAndUpdateRolesAPIComponent />
				)}
				{selected === "/v1/adminUser/linkRole" && (
					<AssignUserRoleAPIComponent />
				)}
				{selected === "/v1/adminUser/role/getAll" && (
					<GetAllRolesAPIComponent />
				)}
				{selected === "/v1/adminUser/role/getAllActive" && (
					<GetAllActiveRolesAPIComponent />
				)}
				{/* check this api for formatting */}
				{selected === "/v1/adminUser/rolePermission/saveOrUpdate" && (
					<LinkRoleAndPermissionsAPIComponent />
				)}
				{/* TODO ADd a is update field which will take id if u wanna update */}
				{selected === "/v1/adminUser/permission/saveOrUpdate" && (
					<CreateAndUpdatePermissionsAPIComponent />
				)}
				{selected === "/v1/adminUser/rolePermission/getAll" && (
					<GetAllPermissionsCurrentRoleAPIComponent />
				)}
				{selected === "/v1/adminUser/rolePermission/getByRoleId" && (
					<GetAllPermissionsByRoleAPIComponent />
				)}
				{selected === "/v1/adminUser/permission/getAll" && (
					<GetAllPermissionsAPIComponent />
				)}
				{selected === "/v1/adminUser/permission/getAllActive" && (
					<GetAllActivePermissionsAPIComponent />
				)}
				{selected === "/v1/adminUser/permission/manage" && (
					<ManagePermissions />
				)}


				{/* ERP */}
				{selected === "/v1/erp/category/add" && <p></p>}
				{selected === "/v1/erp/category/update" && <p></p>}
				{selected === "/v1/erp/products/add" && <p></p>}
				{selected === "/v1/erp/products/update" && <p></p>}
			</section>
		</section>
	)
}

export default MainTabComponent
