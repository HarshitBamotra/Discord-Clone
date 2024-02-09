"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";


export const CreateServerModal = ()=>{

    const {isOpen, onClose, type} = useModal();

    const router = useRouter();

    const isModalOpen = isOpen && type==="createServer";
    
    function handelClose(){
        onClose();
    }

    return(
        <Dialog open = {isModalOpen} onOpenChange={handelClose}>
            <DialogContent className=" bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className=" text-2xl text-center font-bold">
                        Customize Your Server
                    </DialogTitle>
                    <DialogDescription className=" text-center text-zinc-500">
                        
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}