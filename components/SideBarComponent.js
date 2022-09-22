import { useRouter } from "next/router";
import React from "react";

const SideBar = ({ apiList, setApiList, allApis }) => {
	const router = useRouter();

	const handleRoute = (endpoint) => {
		setApiList(false);
		router.push(endpoint);
	};

	return (
		<section className="fixed top-12 h-full bg-main-blue-100 z-[9999] ">
			<div
				className={
					apiList
						? "fixed z-10 left-[15.5rem] transition-all duration-300"
						: "fixed z-10 transition-all duration-300"
				}
			>
				<div className={!apiList ? "h-screen bg-black w-10" : "h-screen"}>
					<button
						onClick={() => setApiList(!apiList)}
						className={
							!apiList
								? "mt-2 rounded-r-lg"
								: "mt-2 rounded-r-lg border-[1px] border-black bg-white"
						}
					>
						{!apiList && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 ml-[.35rem] z-50 hover:brightness-[40%] fill-white rounded-r-lg animate-swing"
								viewBox="0 0 448 512"
							>
								<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
							</svg>
						)}
						{apiList && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="p-1 w-10 z-50 hover:fill-gray-700 fill-black animate-swing"
								viewBox="0 0 448 512"
							>
								<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
							</svg>
						)}
					</button>
				</div>
			</div>
			{/* API List */}
			<div className="w-full">
				<div
					className={
						apiList
							? "animate-dropdown w-[15.5rem] transition-all duration-300 fixed bg-main-blue-100 text-left py-2 overflow-y-scroll h-full scroller border-r-[#a9a9a9] border-2"
							: "transition-all duration-300 fixed -translate-x-[100rem]"
					}
				>
					<div className="divide-y-[1px] divide-neutral-400">
						{allApis.map((api, i) => (
							<div
								key={i}
								className="font-bold py-2 pl-1 cursor-pointer hover:bg-main-blue hover:text-white duration-300 transition-all grid grid-cols-8"
								onClick={() => handleRoute(api.endpoint)}
							>
								<div className="col-span-1 flex justify-center items-center">
									<p className="font-nunito">{i + 1} | </p>
								</div>
								<div className="col-span-7">
									<p className="font-nunito">{api.name}</p>
								</div>
							</div>
						))}
						<div className="mb-12"></div>/
					</div>
				</div>
				<div
					onClick={() => setApiList(false)}
					className={
						apiList
							? "animate-dropdown left-[15.5rem] z-10 w-screen transition-all duration-300 fixed text-center h-screen rounded-tr-xl py-2 overflow-y-auto scroller"
							: "transition-all duration-300 fixed -translate-x-[100rem]"
					}
				></div>
			</div>
		</section>
	);
};

export default SideBar;
