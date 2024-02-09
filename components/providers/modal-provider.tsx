"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/createServerModal";


export const ModalProvider = ()=>{

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return(
        <div>
            <CreateServerModal/>
        </div>
    )
}