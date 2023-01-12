import { useEffect, useState } from "react"
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
import { useRouter } from "next/router"
import { toKebabCase } from "../../helpers/TextHelpers"
import { useDashboardApi } from "../../utils/ApiCalls"

const APICategory = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const tabs = useSelector((state) => state.recent.tabs)
	const apis = useSelector((state) => state.apis)
	const each = useSelector((state) => state.recent.recents)
	const [allTabs, setAllTabs] = useState(tabs)
	const [selected, setSelected] = useState(
		each[0]?.endpoint || allTabs[0]?.endpoint
	)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTab, setSelectedTab] = useState(null)

	useDashboardApi()

	const handleSelect = (each) => {
		setSelectedTab(each)
		dispatch(addToRecent(each))
	}

	useEffect(() => {
		if (router.isReady) {
			apis.forEach((element) => {
				if (toKebabCase(element.category) == router.query.category) {
					setSelectedCategory(element)
					console.log(element)
					setSelectedTab(element.apis[0])
				}
			})
		}
	}, [router.isReady, router.query, apis])

	// useEffect(() => {
	// 	console.log(selectedCategory)
	// }, [selectedCategory])

	// useEffect(() => {
	// 	console.log(apis)
	// }, [apis])

	return (
		<section className="flex flex-col w-full h-full">
			<div className="m-4">
				<h1>
					{selectedCategory?.category} {" "}
					<span className="font-semibold font-lato text-main-blue">
						Management
					</span>
				</h1>
			</div>
			<section className="w-full flex border-b-slate-300 border-b-[1px] overflow-x-auto">
				{selectedCategory?.apis.map((each) => (
					<button
						key={each.endpoint}
						className={
							selectedTab.endpoint === each.endpoint
								? "p-2 mx-2 border-b-main-blue border-b-[1px] text-main-blue shadow-inner duration-200 rounded-t-2xl"
								: "p-2 mx-2 duration-200 rounded-t-2xl"
						}
						onClick={() => {
							handleSelect(each)
						}}
					>
						{each.name}
					</button>
				))}
			</section>
			<section>
				{/* CATEGORY */}
				{selectedTab.endpoint === "/v1/category/view" && <ViewAllCategories />}
				{selectedTab.endpoint === "/v1/category/add" && (
					<AddNewCategoryAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/category/update" && (
					<UpdateCategoryAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/category/update/banner" && (
					<UpdateCategoryBannerAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/category/update/image" && (
					<UpdateCategoryImageAPIComponent />
				)}

				{/* PRODUCTS */}
				{selectedTab.endpoint === "/v1/products/search" && (
					<ProductAdminSearchAPIComponent />
				)}
				{selectedTab.endpoint === 2 && <ProductAdminDetailAPIComponent />}
				{selectedTab.endpoint === 3 && <ProductStockDetailAdminAPIComponent />}
				{selectedTab.endpoint === 5 && <UpdateProductCSVAPIComponent />}
				{selectedTab.endpoint === 6 && <ProductIsActiveAPIComponent />}
				{selectedTab.endpoint === 8 && <ProductPositionDetailAdminAPIComponent />}
				{selectedTab.endpoint === 9 && <UpdateProductPositionCSVAPIComponent />}
				{selectedTab.endpoint === 32 && <AddnUpdateProductCSVAPIComponent />}
				{selectedTab.endpoint === 33 && <UploadProductImageAPIComponent />}

				{/* REPORTS */}
				{selectedTab.endpoint === "/v1/download/users" && (
					<GetUsersReportsAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/download/products" && (
					<GetProductReportsAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/download/outofstock" && (
					<GetProductsOutOfStockAPIComponent />
				)}
				{selectedTab.endpoint ===
					"/v1/download/products/price/updatedinlast24hours" && (
						<ProductPriceUpdatedLast24hAPIComponent />
					)}
				{selectedTab.endpoint === "/v1/download/orders" && (
					<GetOrdersReportsAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/download/abundantcart" && (
					<GetAbundantCartReportsAPIComponent />
				)}

				{/* COUPONS */}
				{selectedTab.endpoint === "/v1/coupons/add" && (
					<AddnUpdateCouponAPIComponent />
				)}

				{/* BANNER */}
				{selectedTab.endpoint === 15 && <ThankyouImageAddUpdateAPIComponent />}
				{selectedTab.endpoint === "/v1/banners/add" && <SaveBannersAPIComponent />}
				{selectedTab.endpoint === 30 && <BannersAPIComponent />}
				{/* {selectedTab.endpoint === 30 && <EditBannersAPIComponent />} */}

				{/* ALERTS & ANNOUNCEMENT */}
				{selectedTab.endpoint === "/v1/misc/ticker" && <TickerUpdateAPIComponent />}
				{selectedTab.endpoint === "/v1/misc/notification" && (
					<NewNotificationSendAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/misc/isContinue" && (
					<IsContinueAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/misc/recommended" && (
					<RecommendedUpdateAPIComponent />
				)}
				{selectedTab.endpoint === 20 && <WebUpdateAPIComponent />}
				{selectedTab.endpoint === 27 && <PopupRedirectionUpdateAPIComponent />}
				{selectedTab.endpoint === "/v1/misc/welcomevideo" && (
					<UpdateWelcomeVideoAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/misc/thankyouimage" && <p></p>}

				{/* OFFERS MANAGEMENT */}
				{selectedTab.endpoint === "/v1/offers/add" && <OfferSaveAPIComponent />}
				{selectedTab.endpoint === "/v1/offers/remove" && (
					<OfferRemoveAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/offers/all" && <p></p>}
				{selectedTab.endpoint === "/v1/offers/detail" && <p></p>}

				{/* ADMIN MANAGEMENT */}
				{/* TODO ADd a is update field which will take id if u wanna update */}
				{selectedTab.endpoint === "/v1/adminUser/role/saveOrUpdate" && (
					<CreateAndUpdateRolesAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/linkRole" && (
					<AssignUserRoleAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/role/getAll" && (
					<GetAllRolesAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/role/getAllActive" && (
					<GetAllActiveRolesAPIComponent />
				)}
				{/* check this api for formatting */}
				{selectedTab.endpoint === "/v1/adminUser/rolePermission/saveOrUpdate" && (
					<LinkRoleAndPermissionsAPIComponent />
				)}
				{/* TODO ADd a is update field which will take id if u wanna update */}
				{selectedTab.endpoint === "/v1/adminUser/permission/saveOrUpdate" && (
					<CreateAndUpdatePermissionsAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/rolePermission/getAll" && (
					<GetAllPermissionsCurrentRoleAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/rolePermission/getByRoleId" && (
					<GetAllPermissionsByRoleAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/permission/getAll" && (
					<GetAllPermissionsAPIComponent />
				)}
				{selectedTab.endpoint === "/v1/adminUser/permission/getAllActive" && (
					<GetAllActivePermissionsAPIComponent />
				)}

				{/* ERP */}
				{selectedTab.endpoint === "/v1/erp/category/add" && <p></p>}
				{selectedTab.endpoint === "/v1/erp/category/update" && <p></p>}
				{selectedTab.endpoint === "/v1/erp/products/add" && <p></p>}
				{selectedTab.endpoint === "/v1/erp/products/update" && <p></p>}
			</section>
		</section>
	)
}

export default APICategory
