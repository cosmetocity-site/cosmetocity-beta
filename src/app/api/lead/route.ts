import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxthVozJivTlpD58sspD59Ky_sgmijz9_rlxXaHw5F3UcxVtzFN_cdivQ0sbP0UF1zbog/exec";

export interface LeadRequestBody {
  name?: string;
  phone?: string;
  treatment?: string;
  message?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadRequestBody;

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const treatment = (body.treatment || "").trim();
    const message = (body.message || "").trim();
    const source = (body.source || "cosmetocity.online").trim();

    if (!name || !phone || !treatment) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, phone number, and treatment are required.",
        },
        { status: 400 }
      );
    }

    const payload = {
      name,
      phone,
      treatment,
      message,
      source,
      createdAt: new Date().toISOString(),
    };

    const webhookResponse = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `CRM Webhook returned HTTP ${webhookResponse.status}`,
        },
        { status: 502 }
      );
    }

    let webhookData: unknown = null;
    const responseText = await webhookResponse.text();
    try {
      webhookData = JSON.parse(responseText);
    } catch {
      webhookData = responseText;
    }

    return NextResponse.json({
      success: true,
      data: webhookData,
    });
  } catch (error) {
    console.error("CRM Lead Submission Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to forward lead to Google Sheets CRM.",
      },
      { status: 500 }
    );
  }
}
