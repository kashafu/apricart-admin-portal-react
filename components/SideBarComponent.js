import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar = ({ apiList, setApiList, allApis }) => {
	const router = useRouter();

	const handleRoute = (endpoint) => {
		router.push(endpoint);
	};

	return (
		<section className="fixed h-screen overflow-y-auto overflow-x-hidden left-0 bg-gray-100">
			<div className=" absolute right-8 z-10">
				<button onClick={() => setApiList(!apiList)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
						className="w-8"
					>
						<path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
					</svg>
				</button>
			</div>
			<div
				className={
					apiList
						? " w-80 relative text-center h-screen rounded-tr-xl p-2 overflow-y-auto"
						: "hidden"
				}
			>
				<div className="">
					{allApis.map((api, i) => (
						<div
							key={i}
							className="font-bold py-2 cursor-pointer hover:bg-main-blue hover:text-white hover:rounded-xl duration-300 transition-all flex overflow-y-auto"
							onClick={() => handleRoute(api.endpoint)}
						>
							<p>{i + 1 + " "}</p>
							<p>{api.name}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SideBar;
