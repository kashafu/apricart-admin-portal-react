import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addToRecent, selectTabs } from "../Redux/Recents/recentsSlice"

import { FiChevronRight } from "react-icons/fi"
import { TbApi } from "react-icons/tb"
import { AiOutlineUser } from "react-icons/ai"

const SideBar = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const apis = useSelector((state) => state.apis)

	const [show, setShow] = useState(false)

	const handleCategorySelect = (each) => {
		dispatch(addToRecent(each.apis[0]))
		dispatch(selectTabs(each.apis))
		if (router.pathname === "/apis/management") {
			router.reload()
		} else {
			router.push("/apis/management")
		}
	}

	return (
		<section className="fixed w-16 bg-slate-900 hover:w-min duration-300 h-screen pt-16">
			<div className="flex flex-col w-full relative justify-between">
				<div
					onClick={() => {
						router.push("/apis")
					}}
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
						{apis.map((each) => {
							let { category } = each

							return (
								<section
									key={category}
									className="flex justify-between items-center cursor-pointer hover:brightness-150 hover:scale-x- transition-all"
									onClick={() => handleCategorySelect(each)}
								>
									<div className="p-2">{category}</div>
								</section>
							)
						})}
					</div>
				</section>
				<div
					onClick={() => {
						router.push("/profile")
					}}
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
