import { Box, Button } from "@mui/material";

interface Props {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const DEVICES_PER_PAGE = 5;
const TOTAL_DEVICES = 15;

const DevicePagination = ({ currentPage, onPageChange }: Props) => {
    const totalPages = Math.ceil(TOTAL_DEVICES / DEVICES_PER_PAGE);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 250,
                left: 0,
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                gap: 1,
                zIndex: 10,
            }}
        >
            {[...Array(totalPages)].map((_, page) => (
                <Button key={page} variant={currentPage === page ? "contained" : "outlined"} onClick={() => onPageChange(page)}>
                    {page * DEVICES_PER_PAGE + 1}-{(page + 1) * DEVICES_PER_PAGE}
                </Button>
            ))}
        </Box>
    );
};

export default DevicePagination;
