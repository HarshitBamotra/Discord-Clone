"use client";

import { db } from "@/lib/db";
import { ServerWithMembersWithProfile } from "@/types";
import { Channel, Member, MemberRole, Server } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfile;
    role?: MemberRole
}

export const ServerHeader = ({
    server, role
}:ServerHeaderProps) => {

    const {onOpen} = useModal();


    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    
    function handleInvite(){
        onOpen("invite", {server});
    }

    function handleEditSettings(){
        onOpen("editServer", {server});
    }

    function handleMembers(){
        onOpen("members", {server});
    }

    function createChannel(){
        onOpen("createChannel", {server});
    }

    function leaveServer(){
        onOpen("leaveServer", {server});
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild >
                <button className=" w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-newtral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"></ChevronDown>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {
                    isModerator?
                        <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer" onClick={handleInvite}>
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
                        </DropdownMenuItem>
                    :<></>
                }
                {
                    isAdmin?
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={handleEditSettings}>
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto"></Settings>
                        </DropdownMenuItem>
                    :<></>
                }
                {
                    isAdmin?
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={handleMembers}>
                            Manage Members
                            <Users className="h-4 w-4 ml-auto"></Users>
                        </DropdownMenuItem>
                    :<></>
                }
                {
                    isModerator?
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={createChannel}>
                            Create Channels
                            <PlusCircle className="h-4 w-4 ml-auto"></PlusCircle>
                        </DropdownMenuItem>
                    :<></>
                }
                {
                    isModerator?
                        <DropdownMenuSeparator/>
                    :<></>
                }
                {
                    isAdmin?
                        <DropdownMenuItem className=" text-rose-500 px-3 py-2 text-sm cursor-pointer">
                            Delete Server
                            <Trash className="h-4 w-4 ml-auto"></Trash>
                        </DropdownMenuItem>
                    :<></>
                }
                {
                    !isAdmin?
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" onClick={leaveServer}>
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto"></LogOut>
                        </DropdownMenuItem>
                    :<></>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
