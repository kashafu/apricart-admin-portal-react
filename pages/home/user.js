import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Cookies from "universal-cookie";
import CustomButton from "../../components/Misc/CustomButton";
import CustomButton2 from "../../components/Misc/CustomButton2";
import FloatingLabelInput from "../../components/Misc/CustomFloatingInput";

const UserAPIPage = () => {
	const cookies = new Cookies();

	let name = cookies.get("cookies-name");
	let email = cookies.get("cookies-email");
	let phoneNumber = cookies.get("cookies-phoneNumber");

	const [newName, setNewName] = useState(name);
	const [newEmail, setNewEmail] = useState(email);
	const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

	return (
		<div className="w-full h-full bg-slate-100 flex items-center justify-center font-nunito">
			<div className="w-5/6 h-5/6 flex flex-col space-y-10">
				<p className="text-3xl font-bold">Account</p>
				<div className="flex flex-col lg:flex-row w-full space-y-10 lg:space-y-0 lg:space-x-10">
					{/* PROFILE PIC and NAME */}
					<div className="w-full lg:w-1/3 h-fit p-4 bg-white rounded-xl flex flex-col items-center space-y-4">
						<Avatar
							title={name}
							name={name}
							round
							size="100"
							textSizeRatio={3}
						/>
						<p className="text-2xl font-semibold">{name}</p>
					</div>
					{/* PERSONAL INFORMATION UPDATE */}
					<div className="w-full lg:w-2/3 h-fit p-4 bg-white rounded-xl flex flex-col space-y-4">
						<div>
							<p className="text-xl font-medium">Profile</p>
							<p className="text-sm font-light">
								The information can be edited
							</p>
						</div>
						<div className="flex flex-col border-y py-6">
							<div className="w-1/2 pr-2">
								<FloatingLabelInput
									type="text"
									label="Full Name"
									onChange={setNewName}
									value={newName}
								/>
							</div>
							<div className="flex flex-row space-x-4">
								<FloatingLabelInput
									type="text"
									label="Email"
									onChange={setNewEmail}
									value={newEmail}
								/>
								<FloatingLabelInput
									type="text"
									label="Phone Number"
									onChange={setNewPhoneNumber}
									value={newPhoneNumber}
								/>
							</div>
							{/* Test Input */}
							{/* Test Input */}
							{/* Test Input */}
							<div className="relative">
								<input
									type="text"
									id="floating_outlined"
									className="z-20 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer"
									placeholder=" "
								/>
								<label className="select-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
									Address
								</label>
							</div>
						</div>
						{/* Test Input */}
						{/* Test Input */}
						<div className="w-full flex justify-end">
							<CustomButton width={"1/3"} position={"right"} className="w-fit">
								Save Details
							</CustomButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAPIPage;
