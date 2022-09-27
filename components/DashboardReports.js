import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import React from "react";

const DashboardReports = () => {
	return (
		<div className="h-screen">
			<PowerBIEmbed
				embedConfig={{
					type: "dashboard", // Supported types: report, dashboard, tile, visual and qna
					id: "2396e9a5-62ab-4635-b659-febf3d7600f2",
					embedUrl:
						"https://app.powerbi.com/dashboardEmbed?dashboardId=b3043049-eb9d-4d8b-a5d3-f09789b434c9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19",
					accessToken:
						"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzEyYjVkYmQtM2E5Mi00MTQ2LWEyMTItMjYwZmYwZTdjODc1LyIsImlhdCI6MTY2NDI2NzU0NywibmJmIjoxNjY0MjY3NTQ3LCJleHAiOjE2NjQyNzIxNDUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFOV0VyZVBOMFZyT0JtbGJWZGJabUY1V0NUbzFMekZwdVhpYnVZYllENVRSbFpjM2pWYnhtd09uaVh1VHE0Q0ltIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiU2hhaGlkIiwiZ2l2ZW5fbmFtZSI6IkZlaG1hYW4iLCJpcGFkZHIiOiIxMjQuMjkuMjI4LjExNCIsIm5hbWUiOiJGZWhtYWFuIFNoYWhpZCIsIm9pZCI6Ijg3MzI5ODQ1LWJkZWEtNDVhZC1iYzZjLTk3ZDJmZmU0ZTU5YiIsInB1aWQiOiIxMDAzMjAwMjFCNjE4NzY5IiwicHdkX2V4cCI6IjMxNTMzMTc4OCIsInB3ZF91cmwiOiJodHRwczovL3Byb2R1Y3Rpdml0eS5zZWN1cmVzZXJ2ZXIubmV0L21pY3Jvc29mdD9tYXJrZXRpZD1lbi1VU1x1MDAyNmVtYWlsPWZlaG1hYW4uc2hhaGlkJTQwYXByaWNhcnQucGtcdTAwMjZzb3VyY2U9Vmlld1VzZXJzXHUwMDI2YWN0aW9uPVJlc2V0UGFzc3dvcmQiLCJyaCI6IjAuQVhrQXZWMHJjWkk2UmtHaUVpWVA4T2ZJZFFrQUFBQUFBQUFBd0FBQUFBQUFBQUI1QUcwLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IkhSX2FBVFNwcmVSR1FYMG1LWjNZY2ZjeDJ2OGhCcW9ObjFqbjFPLTJqeUkiLCJ0aWQiOiI3MTJiNWRiZC0zYTkyLTQxNDYtYTIxMi0yNjBmZjBlN2M4NzUiLCJ1bmlxdWVfbmFtZSI6ImZlaG1hYW4uc2hhaGlkQGFwcmljYXJ0LnBrIiwidXBuIjoiZmVobWFhbi5zaGFoaWRAYXByaWNhcnQucGsiLCJ1dGkiOiJNdHMtc25OSzJrR0w4eU1uZkVaUkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.GmBVSC-BzDYkQGT4gp3q_CflA4QT-LHErKjJKeEdk-DfXPfY4BBJSV2w4eUFkW7yxwtMfPNlN3kpMls4U9BiBU5ZtjHNtm4aMc5lfEI48gXwJrRJYdzafpRG1EOnWhRJEdNFAZJCIHf0GZHX1USDFB0c7MEV73u5HXBu5uCiG3s5qw8HfRg2bC63G3O6xiDghIRlaxr-Mb7_Q2aGew3vj3J0OEEoI56r3IBO0NxN1PofzQVAo-WwVVx8srhlRRBReA4WiGWVLoXYefLcu5oz4ZZfcIbOz1xiMnUglmGvsBmUwigeaoKV5UpzS-5XQhXd4h9D8HrRavAHf-_8s27AQw",
					tokenType: models.TokenType.Aad,
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: true,
							},
						},
					},
				}}
				eventHandlers={
					new Map([
						[
							"loaded",
							function () {
								console.log("Report loaded");
							},
						],
						[
							"rendered",
							function () {
								console.log("Report rendered");
							},
						],
						[
							"error",
							function (event) {
								console.log(event.detail);
							},
						],
					])
				}
				cssClassName={"Embed-container"}
				getEmbeddedComponent={(embeddedDashboard) => {
					window.dashboard = embeddedDashboard;
				}}
			/>
		</div>
	);
};

export default DashboardReports;
