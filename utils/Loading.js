import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = ({ loading }) => {
	return (
		<>
			{loading && (
				<div className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-50 animate-fade-in"
					style={{
						backgroundColor: "#081859E0",
						gap: 20
					}}
				>
					{/* <h3 className="font-nunito text-3xl text-white">
						Loading
					</h3> */}
					<MoonLoader className="" color="#fff" speedMultiplier={1} height={10} width={300} />
				</div>
			)}
		</>
	);
};

export default Loading;
