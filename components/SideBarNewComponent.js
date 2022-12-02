import { useRouter } from "next/router";
import React from "react";
import { AiFillApi } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const SideBarNewComponent = ({ apiList, setApiList, allApis }) => {
	const router = useRouter();
	const handleProductRoute = () => router.push("/home/product");
	const handleUserRoute = () => router.push("/home/user");

	return (
		<section className="fixed w-16 bg-gray-900 hover:w-min duration-300 h-screen pt-16">
			<div className="flex flex-col justify-between ">
				<div
					onClick={handleProductRoute}
					className="hover:brightness-200 cursor-pointer font-nunito text-lg text-main-grey whitespace-nowrap z-10 inline-flex px-6 items-center py-2"
				>
					<div className="pr-4">
						<AiFillApi size={24} />
					</div>
					<a className="overflow-x-hidden">Product Management</a>
				</div>
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
	);
};

export default SideBarNewComponent;
