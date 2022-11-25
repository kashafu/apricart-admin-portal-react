import React from "react";
import { AiFillApi } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const SideBarNewComponent = ({ apiList, setApiList, allApis }) => {
	return (
		<section className="fixed w-16 bg-gray-900 hover:w-min h-screen pt-8">
			<div className="flex flex-col justify-between ">
				<div className="hover:brightness-200 cursor-pointer font-nunito text-lg text-main-grey whitespace-nowrap z-10 inline-flex px-6 items-center py-2">
					<div className="pr-4">
						<AiFillApi size={24} />
					</div>
					<a className="overflow-x-hidden">Product APIs</a>
				</div>
				<div className="hover:brightness-200 cursor-pointer font-nunito text-lg text-main-grey whitespace-nowrap z-10 inline-flex px-6 items-center py-2">
					<div className="pr-4">
						<AiOutlineUser size={24} />
					</div>
					<a className="overflow-x-hidden">User APIs</a>
				</div>
			</div>
		</section>
	);
};

export default SideBarNewComponent;
