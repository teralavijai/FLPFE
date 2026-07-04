import { Container } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function PageContainer({ children }: Props) {
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 4,
                mb: 4,
            }}
        >
            {children}
        </Container>
    );
}
