import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        const user = await currentUser();
        const body = await req.json(); 

        const { name } = body;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const userId = user.id

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_POST', error);
        return new NextResponse("Internal error", { status: 500});
    }
}