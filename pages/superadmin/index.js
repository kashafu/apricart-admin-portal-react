import { useRouter } from "next/router";
import React from "react";
import Heading from "../../components/Misc/Heading";

const SuperAdmin = () => {
	const router = useRouter();
	return (
		<section className="pl-10">
			<title>Super Admin Panel</title>
			<Heading>Super Admin Panel</Heading>
			<section className="grid-cols-6 font-nunito">
				<div className="col-span-2 flex py-2 justify-around ">
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/roles/assign")}
					>
						Assign Role To User
					</div>
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/permissions/linktorole")}
					>
						Link Permissions To Role
					</div>
				</div>
				<div className="col-span-2 flex py-2 justify-evenly ">
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/permissions/add")}
					>
						Create Permission
					</div>
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/roles/add")}
					>
						Create Role
					</div>
				</div>
				<div className="col-span-2 flex py-2 justify-around ">
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/permissions/update")}
					>
						Update Permission
					</div>
					<div
						className="duration-200 ease-in cursor-pointer hover:bg-main-blue-100 p-12 bg-gray-200 rounded-lg"
						onClick={() => router.push("/superadmin/roles/update")}
					>
						Update Role
					</div>
				</div>
			</section>
			<section className="flex flex-col font-nunito">
				<div className="">
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() => router.push("/superadmin/permissions/getactive")}
					>
						Get All Active Permission
					</div>
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() => router.push("/superadmin/roles/getactive")}
					>
						Get All Active Roles
					</div>
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() => router.push("/superadmin/permissions/getall")}
					>
						Get All Permissions
					</div>
				</div>
				<div className="">
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() => router.push("/superadmin/roles/getall")}
					>
						Get All Roles
					</div>
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() => router.push("/superadmin/permissions/getbyrole")}
					>
						Get All Permissions by Role
					</div>
					<div
						className="p-2 cursor-pointer hover:bg-main-blue-100"
						onClick={() =>
							router.push("/superadmin/permissions/getforcurrentrole")
						}
					>
						Get All Permissions for Current Role
					</div>
				</div>
			</section>
		</section>
	);
};

export default SuperAdmin;
