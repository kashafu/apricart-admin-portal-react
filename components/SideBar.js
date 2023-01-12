import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { getAllAPIsPhase2Api } from "../utils/ApiCalls"
import { FiChevronRight } from "react-icons/fi"
import { TbApi } from "react-icons/tb"

import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables"
import { addToRecent, selectTabs } from "../Redux/Recents/recentsSlice"
import { useDispatch } from "react-redux"

const SideBar = ({ allApis, setAllApis }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const handleProductRoute = () => router.push("/apis")
	const handleUserRoute = () => router.push("/profile")
	const [categories, setCategories] = useState([])
	const [show, setShow] = useState(false)
	const [selected, setSelected] = useState("")

	const getCategories = async () => {
		const { baseUrl, headers } = getGeneralApiParams()
		await getAllAPIsPhase2Api(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "")
			// to get the unique category names from all the apis
			const unique = [
				...new Set(
					response?.data?.data?.apis?.map((each) => each.category)
				),
			]
			status ? setCategories(unique) : ""
			status ? setAllApis(response.data.data.apis, status) : ""
		})
	}

	const handleCategorySelect = (each) => {
		setSelected(each)
		let tabs = allApis?.filter((item) => item.category === each)
		dispatch(addToRecent(tabs[0]))
		dispatch(selectTabs(tabs))
		const stripped = each.replace(/\s+/g, "")
		if (router.pathname === "/apis/management") {
			router.reload()
		}
		else {
			router.push("/apis/management")
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<section className="fixed w-16 bg-slate-900 hover:w-min duration-300 h-screen pt-16">
			<div className="flex flex-col w-full relative justify-between">
				<div
					onClick={handleProductRoute}
					className="hover:brightness-200 cursor-pointer font-nunito text-lg text-main-grey whitespace-nowrap z-10 inline-flex px-6 items-center py-2"
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
				>
					<div className="pr-4">
						<TbApi size={24} />
					</div>
					<a className="overflow-x-hidden">API Management</a>
					<div className="cursor-pointer ml-4 -mr-4 overflow-hidden relative">
						<FiChevronRight size={24} className="" />
					</div>
				</div>
				{/* Side DropDown */}
				{/* Side DropDown */}
				{/* Side DropDown */}
				{/* Side DropDown */}
				<section
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
					className={
						show
							? "bg-slate-900 font-nunito text-main-grey text-base flex py-1 flex-col absolute top-0 right-0 translate-x-[100%] w-[260px] duration-200"
							: "-z-40 -left-[500px] fixed duration-300 text-slate-900"
					}
				>
					<div>
						{categories.map((each) => (
							<section
								key={each}
								className="flex justify-between items-center cursor-pointer hover:brightness-150 hover:scale-x- transition-all"
								onClick={() => handleCategorySelect(each)}
							>
								<div className="p-2 ">{each}</div>
							</section>
						))}
					</div>
				</section>
				<div
					onClick={handleUserRoute}
					className="hover:brightness-200 cursor-pointer font-nunito text-lg text-main-grey whitespace-nowrap z-10 inline-flex px-6 items-center py-2"
				>
					<div className="pr-4">
						<AiOutlineUser size={24} />
					</div>
					<a className="overflow-x-hidden">User Management</a>
				</div>
			</div>
		</section>
	)
}

export default SideBar
