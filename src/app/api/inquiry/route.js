import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-10",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request) {
  try {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Server is missing SANITY_API_WRITE_TOKEN." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      name,
      phone,
      email,
      destinationSlug,
      destinationName,
      travelDate,
      travelers,
      message,
    } = body || {};

    if (!name || !phone || !destinationSlug) {
      return NextResponse.json(
        { error: "Name, phone, and destination are required." },
        { status: 400 }
      );
    }

    const inquiryDoc = {
      _type: "tripInquiry",
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      destinationSlug: String(destinationSlug).trim(),
      destinationName: destinationName ? String(destinationName).trim() : "",
      travelDate: travelDate || null,
      travelers: travelers ? Number(travelers) : undefined,
      message: message ? String(message).trim() : "",
      createdAt: new Date().toISOString(),
    };

    await writeClient.create(inquiryDoc);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
