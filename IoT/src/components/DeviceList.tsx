import { Box } from "@mui/material";
import { DeviceInformation } from "./DeviceInformation";

interface Props {
    devices: number[];
    selected: number;
    onSelect: (num: number) => void;
}

const DeviceList = ({ devices, selected, onSelect }: Props) => {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                display: "flex",
                justifyContent: "space-around",
                padding: 2,
                boxSizing: "border-box",
                zIndex: 10,
            }}
        >
            {devices.map((num) => (
                <Box
                    key={num}
                    sx={{
                        cursor: "pointer",
                        border: num === selected ? "2px solid #646cff" : "none",
                        borderRadius: 1,
                    }}
                    onClick={() => onSelect(num)}
                >
                    <DeviceInformation deviceNumber={num} />
                </Box>
            ))}
        </Box>
    );
};

export default DeviceList;
