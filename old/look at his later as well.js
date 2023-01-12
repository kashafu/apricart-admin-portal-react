import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { useDashboardApi } from "../utils/ApiCalls"
import {
	addToRecent,
	deleteEntry,
	selectTabs,
} from "../Redux/Recents/recentsSlice"
import { toKebabCase } from "../helpers/TextHelpers"

import { FiChevronRight } from "react-icons/fi"
import { IoNavigate } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import Link from "next/link"

const ProductAPIPage = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const recents = useSelector((state) => state.recent.recents)
	const apis = useSelector((state) => state.apis)
	const [selectedCategory, setSelectedCategory] = useState(null)

	useDashboardApi()

	const handleRoute = (each) => {
		// console.log(toKebabCase(each.category) + "/" + toKebabCase(each.name))
		dispatch(addToRecent(each))
		let tabs = allApis?.filter((each) => each.category === selected)
		dispatch(selectTabs(tabs))
		const stripped = selected.replace(/\s+/g, "")
		router.push(`/tabs/${stripped.toLowerCase()}`)
	}

	const handleRecent = (each) => {
		dispatch(addToRecent(each))
		let tabs = allApis?.filter((item) => item.category === each.category)
		dispatch(selectTabs(tabs))
		router.push(`/tabs/${selected.toLowerCase()}`)
	}

	return (
		<section className="pl-10 font-nunito my-6">
			<section className="flex w-[99%] h-full">
				{/* RECENT APIS */}
				<div className="bg-white shadow-xl border-slate-200 border-[1px] mx-2 w-[30%]">
					<h3 className="p-6 font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Recent APIs
					</h3>
					<div className="overflow-y-hidden h-96">
						{recents?.map((each, index) => (
							<section
								className="flex items-center"
								key={each.endpoint}
							>
								<div
									className="flex flex-row w-full justify-between items-center pr-4 cursor-pointer hover:bg-gray-300 hover:underline transition-all duration-300 animate-dropdown"
									onClick={() => {
										handleRecent(each)
									}}
								>
									<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
										<p className="select-none px-4">
											{each.name}
										</p>
									</div>
								</div>
								<div
									className="cursor-pointer flex space-x-4 p-4 group hover:bg-slate-200"
									onClick={() => dispatch(deleteEntry(index))}
								>
									<div className="relative">
										<MdDelete
											size={24}
											className="fill-slate-900 group-hover:fill-red-700 transition-all"
										/>
									</div>
								</div>
							</section>
						))}
					</div>
				</div>
				{/* APIS */}
				<aside className="grid grid-cols-3 bg-white shadow-xl border-slate-100 border-[1px] mx-2 w-[70%]">
					<section className="col-span-1">
						<h3 className="p-6 font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
							APIs
						</h3>
						<div>
							<div className="overflow-y-auto scroller-mini h-96">
								{apis.map((each) => (
									<section
										key={each.category}
										className="justify-center items-center"
									>
										<div
											className={
												each.category === selectedCategory?.category
													? "hover:bg-main-blue-100 bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8"
													: "hover:bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8"
											}
											onClick={() => {
												setSelectedCategory(each)
											}}
										>
											<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
												<p className="select-none px-4">
													{each.category}
												</p>
											</div>
											<div className="cursor-pointer  relative">
												<FiChevronRight
													size={24}
													className=""
												/>
											</div>
										</div>
									</section>
								))}
							</div>
						</div>
					</section>
					<section className="col-span-2 duration-300 transition-all">
						<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark"></h3>
						<div className="overflow-y-auto flex flex-col scroller-mini h-96">
							{selectedCategory?.apis.map((each) => {
								let { category, endpoint, name } = each

								return (
									<div
										key={endpoint}
										className="justify-center w-full animate-dropdown hover:bg-gray-300 cursor-pointer duration-200 ease-in"
									>
										<Link
											href={`/apis/${toKebabCase(category)}`}
										>
											<a className="justify-center w-full animate-dropdown hover:bg-gray-300 cursor-pointer duration-200 ease-in grid items-center grid-cols-8">
												<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
													<p className="select-none px-4">
														{name}
													</p>
												</div>
												<div className="cursor-pointer  relative">
													<IoNavigate
														size={24}
														className="animate-dropdown"
													/>
												</div>
											</a>
										</Link>
									</div>
								)
							})}
						</div>
					</section>
				</aside>
			</section >
		</section >
	)
}

export default ProductAPIPage
