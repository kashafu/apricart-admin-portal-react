import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar = ({ apiList, setApiList, allApis }) => {
	const router = useRouter();

	const handleRoute = (endpoint) => {
		router.push(endpoint);
	};

	return (
		<section className="fixed h-screen overflow-y-auto overflow-x-hidden left-0 bg-main-blue-100 z-[9999]">
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
								viewBox="0 0 384 512"
								className="w-9 z-50 hover:brightness-[40%] fill-white animate-swing"
							>
								<path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
							</svg>
						)}
						{apiList && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								className="w-9 z-50 hover:fill-gray-700 fill-black animate-swing"
							>
								<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
							</svg>
						)}
					</button>
				</div>
			</div>
			{/* API List */}
			<div
				className={
					apiList
						? "animate-dropdown w-[15.5rem] transition-all duration-300 fixed bg-main-blue-100 text-center h-screen rounded-tr-xl py-2 overflow-y-auto scroller"
						: "transition-all duration-300 fixed -translate-x-[100rem]"
				}
			>
				<div className="">
					{allApis.map((api, i) => (
						<div
							key={i}
							className="font-bold py-2 px-2 cursor-pointer hover:bg-main-blue hover:text-white duration-300 transition-all flex overflow-y-auto"
							onClick={() => handleRoute(api.endpoint)}
						>
							<p className="font-nunito">{i + 1 + ". " + api.name}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SideBar;
