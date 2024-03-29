"use client";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, Gavel, Loader2, MoreVertical, RefreshCw, Shield, ShieldAlert, ShieldCheck, ShieldQuestion, icons } from "lucide-react";

import { useState } from "react";
import axios from "axios";
import { ServerWithMembersWithProfile } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../userAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import qs from "query-string";



const roleIconMap = {
    "GUEST" : null,
    "MODERATOR" : <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"></ShieldCheck>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"></ShieldAlert>
}





export const MembersModal = ()=>{

    const router = useRouter();

    const {onOpen, isOpen, onClose, type, data} = useModal();
    const {server} = data as {server: ServerWithMembersWithProfile};

    const [loadingId, setLoadingId] = useState("");


    const isModalOpen = isOpen && type==="members";
    
    const onRoleChange = async (
        memberId: string,
        role: MemberRole
        )=>{

        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId: server?.id,
                }
            })

            const response = await axios.patch(url, {role});
            router.refresh();
            
            onOpen("members", {server:response.data});

        } catch (error) {
            console.log(error);
        }
        finally{
            setLoadingId("");
        }

    }

    const onKick = async (
        memberId: string
    )=>{
        try {
            
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query:{
                    serverId: server?.id
                }
            });

            const response = await axios.delete(url);

            router.refresh();
            onOpen("members", {server: response.data});

        } catch (error) {
            console.log(error);
        }
        finally{
            setLoadingId("");
        }
    }



    function handelClose(){
        onClose();
    }

    return(
        <Dialog open = {isModalOpen} onOpenChange={handelClose}>
            <DialogContent className=" bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className=" text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-600">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member)=>(
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}></UserAvatar>
                            <div className=" flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {
                                server.profileId !== member.profileId && loadingId !== member.id && (
                                    <div className="ml-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="h-4 w-4 text-zinc-500"></MoreVertical>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2"></ShieldQuestion>
                                                        <span>
                                                            role
                                                        </span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem onClick={()=> onRoleChange(member.id, "GUEST")}>
                                                                <Shield className="h-4 w-4 mr-2"></Shield>
                                                                Guest
                                                                {member.role === "GUEST" ? <Check className="h-4 w-4 ml-auto"></Check>:<></>}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={()=>onRoleChange(member.id, "MODERATOR")}>
                                                                <ShieldCheck className="h-4 w-4 mr-2"></ShieldCheck>
                                                                Moderator
                                                                {member.role === "MODERATOR" ? <Check className="h-4 w-4 ml-auto"></Check>: <></>}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator></DropdownMenuSeparator>
                                                <DropdownMenuItem onClick={()=>onKick(member.id)}>
                                                    <Gavel className="h-4 w-4 mr-2"></Gavel>
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )
                            }
                            {loadingId === member.id ? <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>:<></>}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

