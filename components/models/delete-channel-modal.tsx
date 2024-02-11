"use client";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import qs from "query-string";


export const DeleteChannelModal = ()=>{

    const { isOpen, onClose, type, data} = useModal();
    const {server, channel} = data;

    const router = useRouter();

    const isModalOpen = isOpen && type==="deleteChannel";
    
    const [isLoading, setIsLoading] = useState(false);

    function handelClose(){
        onClose();
    }

    const onConfirm = async()=>{
        try {
            setIsLoading(true);

            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query:{
                    serverId: server?.id
                }
            });


            await axios.delete(url);

            onClose();
            router.push(`/servers/${server?.id}`);
            router.refresh();
            // location.reload();
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }

    }

    return(
        <Dialog open = {isModalOpen} onOpenChange={handelClose}>
            <DialogContent className=" bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className=" text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className=" text-center text-zinc-600">
                        Are you sure you want to delete <span className="font-semibold text-indigo-500">{channel?.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className=" bg-gray-100 px-6 py-4">
                    <div className=" flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">Cancel</Button>
                        <Button disabled={isLoading} onClick={onConfirm} variant="primary">Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}