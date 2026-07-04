import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette:{

        mode:"light",

        primary:{
            main:"#1565C0",
        },

        secondary:{
            main:"#6A1B9A",
        },

        background:{
            default:"#F4F6F8",
        },

    },

    shape:{
        borderRadius:10,
    },

    typography:{

        fontFamily:
            "Inter, Roboto, Arial, sans-serif",

        h4:{
            fontWeight:700,
        },

        h5:{
            fontWeight:600,
        },

        h6:{
            fontWeight:600,
        },

    },

});

export default theme;
