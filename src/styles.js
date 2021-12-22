import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const BOX_BORDER = "1px solid #262626";
const BORDER_RADIUS = "4px";

export const lightTheme = {
    accent: "#00bf00",
    bgColor:"#FAFAFA",
    fontColor:"rgb(38, 38, 38)",
    borderColor:"rgb(219, 219, 219)",
    whiteBox:   ` border:${BOX_BORDER}; 
                    border-radius:${BORDER_RADIUS};
                    background-color:white;
                `
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing:border-box;
    }
    body{
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', 'sans-serif';
        color:rgb(38,38,38);
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;