"use client";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, icons } from "lucide-react";

import { useState } from "react";
import axios from "axios";


export const MembersModal = ()=>{

    const {onOpen, isOpen, onClose, type, data} = useModal();
    const {server} = data;


    
    const router = useRouter();

    const isModalOpen = isOpen && type==="members";
    


    function handelClose(){
        onClose();
    }

    return(
        <Dialog open = {isModalOpen} onOpenChange={handelClose}>
            <DialogContent className=" bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className=" text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    Hello Suckers
                </div>
            </DialogContent>
        </Dialog>
    )
}

