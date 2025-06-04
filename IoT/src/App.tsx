import "./App.css";
import { useState } from "react";
import { DeviceInformation } from "./components/DeviceInformation";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import DevicePagination from "./components/Pagination";
import DeviceList from "./components/DeviceList";
import DeviceChart from "./components/DeviceChart";

const DEVICES_PER_PAGE = 5;

function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedDeviceNumber, setSelectedDeviceNumber] = useState(1);
    const devicesOnPage = Array.from({ length: DEVICES_PER_PAGE }, (_, i) => i + 1 + currentPage * DEVICES_PER_PAGE);

    return (
        <>
            <Navbar />

            {/* Box z wybranym urządzeniem i jego wykresem */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    mb: 4,
                    flexWrap: "wrap",
                    px: 2,
                }}
            >
                <DeviceInformation deviceNumber={selectedDeviceNumber} />
                <Box sx={{ minWidth: 320, flex: "1 1 300px" }}>
                    <DeviceChart deviceNumber={selectedDeviceNumber} />
                </Box>
            </Box>

            {/* Paginacja */}
            <DevicePagination currentPage={currentPage} onPageChange={setCurrentPage} />

            {/* Lista urządzeń */}
            <DeviceList devices={devicesOnPage} selected={selectedDeviceNumber} onSelect={setSelectedDeviceNumber} />
        </>
    );
}

export default App;
