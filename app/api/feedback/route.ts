import { NextRequest, NextResponse } from "next/server";
import { FeedbackType } from "@/app/page";
import prisma from "@/utils/prisma.server";

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const data: FeedbackType = JSON.parse(fd.get("data") as string);
    const entry = await prisma.fback.create({
      data: data,
    });

    return NextResponse.json({
      flag: entry.id ? true : false,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      flag: false,
    });
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.fback.findMany();

    return NextResponse.json({
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      feedbacks: [],
    });
  }
}
