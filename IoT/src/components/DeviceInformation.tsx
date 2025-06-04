import { Typography } from "@mui/material";
import { CloudUpload, DeviceThermostat, Opacity } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

interface DeviceInformationProps {
    deviceNumber: number;
}

type DevicesListProps = {
    onSelect: (deviceNumber: number) => void;
};

export function DeviceInformation({ deviceNumber }: DeviceInformationProps) {
    const data = {
        temperature: 22.5 + deviceNumber,
        pressure: 1000 + deviceNumber,
        humidity: 50 + deviceNumber,
    };

    return (
        <>
            <Box
                sx={{
                    width: "300px",
                    height: "fit-content",
                    backgroundColor: "#1E1E1E",
                    borderRadius: "0px",
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    boxSizing: "border-box",
                }}
            >
                <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
                    Device No. {deviceNumber}
                </Typography>
                <Divider
                    sx={{
                        width: "100%",
                        height: 10,
                        borderRadius: "5px",
                        marginTop: 2,
                        marginBottom: 2,
                        boxSizing: "border-box",
                        backgroundColor: "white",
                    }}
                />
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DeviceThermostat sx={{ mr: 1 }} />
                    <span className="value">{data.temperature}</span>&nbsp;&deg;C
                </Typography>

                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CloudUpload sx={{ mr: 1 }} />
                    <span className="value">{data.pressure}</span>&nbsp;hPa
                </Typography>

                <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                    <Opacity sx={{ mr: 1 }} />
                    <span className="value">{data.humidity}</span>&nbsp;%
                </Typography>
            </Box>
        </>
    );
}

export function DevicesList({ onSelect }: DevicesListProps) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                bgcolor: "#121212",
                display: "flex",
                justifyContent: "space-around",
                padding: 2,
                boxSizing: "border-box",
            }}
        >
            {[1, 2, 3, 4, 5].map((num) => (
                <Box key={num} sx={{ cursor: "pointer" }} onClick={() => onSelect(num)}>
                    <DeviceInformation deviceNumber={num} />
                </Box>
            ))}
        </Box>
    );
}
