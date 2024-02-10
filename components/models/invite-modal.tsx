"use client";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, icons } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteModal = ()=>{

    const {onOpen, isOpen, onClose, type, data} = useModal();
    const {server} = data;


    const origin = useOrigin();
    const router = useRouter();

    const isModalOpen = isOpen && type==="invite";
    
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = ()=>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        }, 1000);

        // onClose();
    }

    const generateNewLink = async ()=>{
        try {
            setIsLoading(true);
            const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("invite", {server:res.data});

        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }


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
                    <Label className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        server invite link
                    </Label>
                    <div className=" flex items-center mt-2 gap-x-2">
                        <Input
                            disabled = {isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value= {inviteUrl}
                        />
                        <Button size="icon" onClick={onCopy} disabled={isLoading}>
                            {copied? <Check className="h-4 w-4"></Check> : <Copy className="h-4 w-4"></Copy>}
                            
                        </Button>
                    </div>
                    <Button
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                        onClick={generateNewLink}
                    >
                        generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}