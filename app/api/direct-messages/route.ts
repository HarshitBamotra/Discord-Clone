import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server";





const MessageBatch = 15;

export async function GET(
    req: Request
){
    try {
        const profile = currentProfile();
        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId");

        if(!profile){
            return new NextResponse("Unauthoorised", {status: 401});
        }
        if(!conversationId){
            return new NextResponse("conversation id missing", {status: 400});
        }

        let messages: DirectMessage[] = [];

        if(cursor){
            messages = await db.directMessage.findMany({
                take: MessageBatch,
                skip: 1,
                cursor:{
                    id: cursor
                },
                where:{
                    conversationId: conversationId
                },
                include:{
                    member:{
                        include:{
                            profile:true
                        }
                    }
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
        }
        else{
            messages = await db.directMessage.findMany({
                take: MessageBatch,
                where:{
                    conversationId: conversationId,
                },
                include:{
                    member:{
                        include:{
                            profile: true
                        }
                    }
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;

        if(messages.length === MessageBatch){
            nextCursor = messages[MessageBatch-1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor: nextCursor
        })
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", {status: 500});
    }
}