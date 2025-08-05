import { useCallback, useEffect, useRef, useState } from "react";
import { InitStep, useInitStep } from "../context/InitStepContext";
import { Box, TypeFace } from "@greysole/spooder-component-library";
import { finishInit } from "../Request";
import { useInitContext } from "../context/InitContextProvider";

export default function FinishStep() {
	const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();
	const { config } = useInitContext();
	const gotoPrevStep = useCallback(() => {
		setCurrentStep(InitStep.HOSTING);
	}, [setCurrentStep]);
	const [statusText, setStatusText] = useState("");
	const [statusCountDown, setStatusCountDown] = useState(5);

	const countDownRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		console.log(config.network.host_port);

		if (countDownRef.current) {
			clearInterval(countDownRef.current);
		}
		countDownRef.current = setInterval(() => {
			setStatusCountDown((prev) => {
				if (prev <= 0) {
					window.location.href = `http://localhost:${config.network.host_port}`;
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			if (countDownRef.current) {
				clearInterval(countDownRef.current);
			}
		};
	});

	useEffect(() => {
		setNextAction(() => () => {});
		setPrevAction(() => () => gotoPrevStep());
		finishInit().then((data) => {
			if (data.status === "ok") {
				//{ status: 'ok', ipcConnected: ipcConnected }
				if (data.ipcConnected) {
					setStatusText(
						`Nice, you have the installer app! Your Spooder is restarting now. Refreshing page in ${statusCountDown} seconds...`
					);
				} else {
					setStatusText(
						`Looks like you're not using the installer app. Restart your Spooder manually and refresh this page to access the WebUI.`
					);
				}
			}
		});
	}, [gotoPrevStep, setNextAction, setPrevAction, statusCountDown]);

	return (
		<Box padding="medium">
			<TypeFace fontSize="large">{statusText}</TypeFace>
		</Box>
	);
}
