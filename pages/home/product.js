import { getAllAPIsApi } from "../../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../../utils/GeneralVariables";
import { addToRecent, selectTabs } from "../../Redux/Recents/recentsSlice";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronRight } from "react-icons/fi";
import { IoNavigate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const ProductAPIPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const recents = useSelector((state) => state.recent.recents);
	const [allApis, setAllApis] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState("");
	const getAPIs = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			// to get the unique category names from all the apis
			const unique = [
				...new Set(response?.data?.data?.apis?.map((each) => each.category)),
			];
			status ? setSelected(unique[0]) : "";
			status ? setCategories(unique) : "";
			status ? setAllApis(response.data.data.apis, status) : "";
		});
	};

	const handleRoute = (each) => {
		dispatch(addToRecent(each));
		let tabs = allApis?.filter((each) => each.category === selected);
		dispatch(selectTabs(tabs));
		router.push(`/tabs/${selected.toLowerCase()}`);
	};

	useEffect(() => {
		getAPIs();
	}, []);

	return (
		<section className="pl-10 font-nunito my-6">
			<section className="flex w-[99%] h-full">
				<div className="bg-white shadow-xl border-slate-200 border-[1px] mx-2 w-[30%]">
					<h3 className="p-6 font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Recent APIs
					</h3>
					<div className="overflow-y-hidden h-96">
						{recents?.map((each) => (
							<section
								key={each.endpoint}
								className="flex flex-row w-full justify-between items-center pr-4 hover:bg-gray-300 cursor-pointer duration-200 animate-dropdown"
								onClick={() => {
									handleRoute(each)
								}}
							>
								<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
									<p className="select-none px-4">{each.name}</p>
								</div>
								<div className="flex space-x-4">
									<div className="cursor-pointer relative">
										<IoNavigate size={24} />
									</div>
									<div className="cursor-pointer relative">
										<MdDelete size={24} color="red" />
									</div>
								</div>
							</section>
						))}
					</div>
				</div>
				<aside className="grid grid-cols-3 bg-white shadow-xl border-slate-100 border-[1px] mx-2 w-[70%]">
					<section className="col-span-1">
						<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark"></h3>
						<div>
							<div className="overflow-y-auto scroller-mini h-96">
								{categories?.map((each, index) => (
									<section
										key={each.index}
										className=" justify-center items-center "
									>
										<div
											className={
												each === selected
													? "hover:bg-main-blue-100 bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8"
													: "hover:bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8"
											}
											onClick={() => setSelected(each)}
										>
											<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
												<p className="select-none px-4">{each}</p>
											</div>
											<div className="cursor-pointer  relative">
												<FiChevronRight size={24} className="" />
											</div>
										</div>
									</section>
								))}
							</div>
						</div>
					</section>
					<section className="col-span-2 duration-300 transition-all">
						<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark"></h3>
						<div>
							<div className="overflow-y-auto scroller-mini h-96">
								{allApis
									?.filter((each) => each.category === selected)
									?.map((each) => (
										<section
											key={each.endpoint}
											className="justify-center items-center animate-dropdown"
										>
											<div
												className="hover:bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8"
												onClick={() => handleRoute(each)}
											>
												<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
													<p className="select-none px-4">{each.name}</p>
												</div>
												<div className="cursor-pointer  relative">
													<IoNavigate size={24} className="animate-dropdown" />
												</div>
											</div>
										</section>
									))}
							</div>
						</div>
					</section>
				</aside>
			</section>
		</section>
	);
};

export default ProductAPIPage;
