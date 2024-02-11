"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/createServerModal";
import { InviteModal } from "../models/invite-modal";
import { EditServerModal } from "../models/edit-server-modal";
import { MembersModal } from "../models/members-modal";
import { CreateChannelModal } from "../models/create-channel-modal";
import { LeaveServerModal } from "../models/leave-server-modal";


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
            <InviteModal/>
            <EditServerModal/>
            <MembersModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
        </div>
    )
}