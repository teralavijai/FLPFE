import Chip from "@mui/material/Chip";

import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";

import { useRuntime } from "../../../hooks/useRuntime";

export default function RuntimeConnectionChip() {

    const { connected } = useRuntime();

    return (

        <Chip

            icon={

                connected

                    ? <WifiIcon />

                    : <WifiOffIcon />

            }

            label={

                connected

                    ? "Connected"

                    : "Disconnected"

            }

            color={

                connected

                    ? "success"

                    : "error"

            }

            variant="filled"

            size="medium"

        />

    );

}