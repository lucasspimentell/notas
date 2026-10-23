
import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../header";

export function Layout(){
    const[searchTerm,setSearchTerm]=useState('');
    
    return(
        <>
        <Header searchTerm={searchTerm} onSearchTerm={setSearchTerm} />

        <Outlet context={{searchTerm,setSearchTerm}}/>
        </>
    )
}