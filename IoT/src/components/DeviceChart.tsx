import { LineChart } from "@mui/x-charts/LineChart";

const margin = { right: 24 };

type DeviceChartProps = {
    deviceNumber: number;
};

export default function DeviceChart({ deviceNumber }: DeviceChartProps) {
    const data = {
        temperature: 22.5 + deviceNumber,
        pressure: (1000 + deviceNumber) / 10,
        humidity: 50 + deviceNumber,
    };

    const xLabels = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"];
    const tempData = new Array(7).fill(data.temperature);
    const pressureData = new Array(7).fill(data.pressure);
    const humidityData = new Array(7).fill(data.humidity);

    return (
        <LineChart
            sx={{
                width: "40vh",
                ".MuiChartsLegend-root": { color: "white" },
                ".MuiChartsLegend-label": { color: "white !important" },
                ".MuiChartsAxis-root line": { stroke: "white" },
                ".MuiChartsAxis-tickLabel": { fill: "white" },
                ".MuiChartsAxis-label": { fill: "white" },
                ".MuiChartsGrid-line": { stroke: "white" },
            }}
            height={300}
            series={[
                { data: tempData, label: "Temperatura (°C)", color: "#f44336" },
                { data: pressureData, label: "Ciśnienie (hPa / 10)", color: "#2196f3" },
                { data: humidityData, label: "Wilgotność (%)", color: "#4caf50" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels, tickLabelStyle: { fill: "white" } }]}
            yAxis={[{ tickLabelStyle: { fill: "white" } }]}
            margin={margin}
            slotProps={{
                legend: {
                    labelStyle: { color: "white", fill: "white" },
                },
            }}
        />
    );
}
