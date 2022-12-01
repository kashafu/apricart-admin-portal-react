import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

import Logo from "../../public/logo-white.png";
import ProfileViewComponent from "../ProfileViewComponent";
import Avatar from "react-avatar";
import Heading from "../Misc/Heading";
import ProfileViewNewComponent from "../ProfileViewNewComponent";

const Navbar = ({ name }) => {
	const router = useRouter();
	const [profileDisplay, setProfileDisplay] = useState(false);

	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay);
	};

	return (
		<nav className="fixed w-screen z-50 border-b-[1px] border-gray-300">
			<div className="h-12 flex justify-between items-center overflow-hidden">
				<div className="w-28 cursor-pointer">
					{/* <Image
						src={Logo}
						alt="Logo"
						layout="responsive"
						onClick={() => router.push("/")}
					/> */}
				</div>
				{/* <div
					className="flex justify-center items-center"
					onClick={() => router.push("/")}
				>
					<h2 className="truncate text-txt-light font-nunito text-lg lg:text-2xl font-bold">
						CBE Admin Portal
					</h2>
				</div> */}
				<div className="px-2 flex justify-center items-center">
					<div className="text-txt-light font-nunito text-xs lg:text-base p-4 rounded-xl transition-all duration-300 hover:cursor-pointer">
						<button onClick={handleDisplay}>
							<Avatar
								name={name}
								size="40"
								className="hover:brightness-90"
								round
							/>
						</button>
					</div>
					{/* <ProfileViewComponent
						profileDisplay={profileDisplay}
						setProfileDisplay={setProfileDisplay}
					/> */}
					<ProfileViewNewComponent
						profileDisplay={profileDisplay}
						setProfileDisplay={setProfileDisplay}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
