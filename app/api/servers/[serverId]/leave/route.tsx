import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params: {serverId:string}}
){
    try {
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("Profile Missing", {status: 401});
        }

        const serverId = params.serverId;

        if(!serverId){
            return new NextResponse("Server Id Missing", {status: 400});
        }

        const server = await db.server.update({
            where:{
                id:serverId,
                profileId:{
                    not:profile.id
                },
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
                members:{
                    deleteMany:{
                        profileId:profile.id
                    }
                }
            }
        })

        return NextResponse.json(server);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}