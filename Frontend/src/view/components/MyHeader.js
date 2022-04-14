import React from 'react';
import {AppBar, Box, Toolbar} from "@mui/material";
import {SiDeepnote} from "react-icons/si";
import {TiUserOutline} from "react-icons/ti";
import {MdOutlineDarkMode,MdOutlineLightMode} from "react-icons/md";

export function MyHeader ({mode,setMode}){

    return (
        <Box sx={{maxHeight:"40px", overflow:"hidden",position:"relative", zIndex:9999}} >
            <AppBar position="static" sx={{backgroundColor:"background.header",color:"text.primary",backgroundImage:"none"}}  enableColorOnDark>
                <Toolbar style={{minHeight:"40px"}}>
                    <SiDeepnote size={"1.5rem"} className={"ml-1 mr-2"}/>
                    <Box component="div" sx={{ flexGrow: 1 }} ml={2}>
                        <b>Beacon</b>
                    </Box>
                    {/*{mode==="light" &&
                        <MdOutlineDarkMode size={"1.5rem"} className={"clickable mr-1"} onClick={()=>setMode("dark")}/>}
                    {mode==="dark" &&
                        <MdOutlineLightMode size={"1.5rem"} className={"clickable mr-1"} onClick={()=>setMode("light")}/>}*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
