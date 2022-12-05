import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

import Logo from "../../public/logo.png";
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
		<nav className="bg-white fixed w-screen z-50 border-b-[1px] border-gray-300">
			<div className="cursor-pointer h-12 flex justify-between items-center overflow-hidden">
				<div
					className="flex min-w-min items-center"
					onClick={() => router.push("/")}
				>
					<div className="ml-6 w-20 mx-2">
						<Image src={Logo} alt="Logo" layout="responsive" />
					</div>
					<h5 className="truncate font-nunito text-base font-bold mx-2">
						Apricart APM
					</h5>
				</div>

				<div className="px-2 flex justify-center items-center">
					<div className="text-txt-light font-nunito text-xs lg:text-base p-4 rounded-xl transition-all duration-300 hover:cursor-pointer">
						<button onClick={handleDisplay}>
							<Avatar
								title={name}
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
