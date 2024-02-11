"use client"

import { ServerWithMembersWithProfile } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import { ActionTooltip } from "../action-tooltip"
import { Plus, Settings } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

interface ServerSectionProps{
    label:string,
    role?:MemberRole,
    sectionType:"channels" | "members",
    channelType?: ChannelType,
    server?: ServerWithMembersWithProfile
}


export const ServerSection = (
    {label, role, sectionType, channelType, server}: ServerSectionProps
)=>{

    const {onOpen} = useModal();



    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role!== MemberRole.GUEST && sectionType==="channels" &&(
                <ActionTooltip label="create channel" side="top">
                    <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 p-1 rounded-md transition" onClick={()=>{onOpen("createChannel", {channelType})}}>
                        <Plus className="h-4 w-4"></Plus>
                    </button>
                </ActionTooltip>
            ) }

            {role===MemberRole.ADMIN && sectionType==="members" && (
                <ActionTooltip label="manage members" side="top">
                    <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 p-1 rounded-md transition" onClick={()=>{onOpen("members", {server})}}>
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}