import Link from "next/link"

import { SiQuantconnect } from "react-icons/si"
import { MdManageAccounts } from "react-icons/md"

const Index = () => {
	return (
		<section className="bg-slate-100 py-12 h-full w-full">
			<section className="mt-14 px-10 grid grid-cols-3 w-full">
				<Link
					href={"/apis"}
					passHref
				>
					<a className="grid grid-cols-2 grid-rows-2 gap-2 h-60 mx-6 bg-white duration-500 cursor-pointer rounded-xl overflow-hidden">
						<div className="p-4 font-nunito ">
							<p className="text-slate-500 text-md font-bold">
								API MANAGEMENT
							</p>
						</div>
						<div className="h-full w-full bg-blue-300"></div>
						<div className="h-full w-full bg-blue-300"></div>
						<div className="h-full w-full bg-blue-500 flex justify-center items-center">
							<SiQuantconnect
								className="fill-slate-100 animate-spin"
								size={60}
							/>
						</div>
					</a>
				</Link>

				<section></section>

				<Link
					href={"/profile"}
					passHref
				>

					<a className="grid grid-cols-2 grid-rows-2 gap-2 h-60 mx-6 bg-white duration-500 cursor-pointer rounded-xl overflow-hidden"				>
						<div className="p-4 font-nunito ">
							<p className="text-slate-500 text-md font-bold">
								USER MANAGEMENT
							</p>
						</div>
						<div className="h-full w-full bg-blue-100"></div>
						<div className="h-full w-full bg-blue-100"></div>
						<div className="h-full w-full bg-blue-300 flex justify-center items-center">
							<MdManageAccounts
								className="fill-slate-900"
								size={60}
							/>
						</div>
					</a>
				</Link>
			</section>
		</section>
	)
}

export default Index
