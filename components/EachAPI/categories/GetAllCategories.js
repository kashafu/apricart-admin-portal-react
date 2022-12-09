import { useEffect } from "react";
import { useState } from "react";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { getAllCategoriesApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import { FiChevronsRight } from "react-icons/fi";
import { IoNavigate } from "react-icons/io5";

const GetAllCategories = () => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [allApis, setAllApis] = useState([]);
	const [selected, setSelected] = useState("");

	const getCategories = async () => {
		setLoading(true);
		const { baseUrl } = getGeneralApiParams();

		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			let status = checkStatus(response, "");
			status && setCategories(response.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		getCategories();
	}, []);

	// <SingleAPILayout />
	return (
		<section>
			<Loading loading={loading} />

			<aside className="grid grid-cols-3 bg-white shadow-xl border-slate-100 border-[1px] mx-2 w-[70%]">
				<section className="col-span-1">
					<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Categories
					</h3>
					<div>
						<div className="overflow-y-auto scroller-mini h-96">
							{categories.map((each) => (
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
											<p className="select-none px-4">{each.name}</p>
										</div>
										<div className="cursor-pointer  relative">
											<FiChevronsRight size={24} className="" />
										</div>
									</div>
								</section>
							))}
						</div>
					</div>
				</section>
				{/* Second column */}
				{/* Second column */}
				{/* Second column */}
				{/* Second column */}
				{/* Second column */}
				<section className="col-span-2 duration-300 transition-all">
					<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Sub Categories
					</h3>
					<div>
						<div className="overflow-y-auto scroller-mini h-96">
							{selected.childrenData
								// ?.filter((each) => each?.parent === selected.id)
								?.map((each) => (
									<section
										key={each.endpoint}
										className="justify-center items-center animate-dropdown"
									>
										<div className="hover:bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-8">
											<div className="col-span-7 overflow-y-auto py-4 px-2 duration-300 ">
												<p className="select-none px-4">{each.name}</p>
											</div>
										</div>
									</section>
								))}
						</div>
					</div>
				</section>
			</aside>
		</section>
	);
};

export default GetAllCategories;
