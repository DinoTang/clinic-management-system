import { useEffect } from "react";
import formatDateToText from '../../utils/format.js';

function Clock({ className }) {

    useEffect(() => {
        const container = document.getElementById("nav-helper-clock");

        if (!container) return;

        const timer = setInterval(() => {
            const now = new Date();
            const text = formatDateToText(now);

            container.textContent = text;
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
    	<>
	        <div id="nav-helper-clock" className={className}></div>
        </>
    );
}

export default Clock;