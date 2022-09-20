import React from "react";
import { BarLoader } from "react-spinners";

const Loading = ({ loading }) => {
	return (
		<div className="fixed z-50">
			{loading && (
				<>
					<div className="bg-main-blue bg-opacity-50 flex flex-col justify-center overflow-hidden items-center w-screen h-screen z-50">
						<h3 className="z-20 font-nunito text-white animate-hide">
							Loading
						</h3>
						<BarLoader className="" color="#fff" speedMultiplier={1} />
					</div>
				</>
			)}
		</div>
	);
};

export default Loading;
