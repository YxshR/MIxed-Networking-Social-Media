import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetweem";
import WidgitWapper from "../../components/WidgitWapper";


const AdvertWidget = () =>{
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const light = palette.neutral.light
    const medium = palette.neutral.medium


    return (
        <WidgitWapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                     Sponsored
                </Typography>
                <Typography color={medium} >
                    Create Advertisement
                </Typography>
            </FlexBetween>
            <img
             width="100%"
             height="auto"
             alt="advert"
             src="http://localhost:3001/assets/info4.jpeg"
             style={{ borderRadius:"0.75rem" , margin:"0.75rem"  }}
             />
             <FlexBetween>
                <Typography color={medium} >MikaCosmatic</Typography>
                <Typography color={medium}>
                MikaCosmatic.com
                </Typography>
             </FlexBetween>
             <Typography color={medium} m="0.5rem 0">

             </Typography>
        </WidgitWapper>
    )
}

export default AdvertWidget