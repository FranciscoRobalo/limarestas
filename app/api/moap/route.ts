import { NextRequest, NextResponse } from "next/server"

const MOAP_API_BASE_URL = "https://moap.vercel.app/api/external"
const MOAP_API_KEY = "moap_dev_key_2026_secure_connection"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(MOAP_API_BASE_URL, {
      method: "POST",
      headers: {
        "x-api-key": MOAP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `MOAP API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[MOAP API Route] Error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// GET handler for fetching materials and budgets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const table = searchParams.get("table")
    const category = searchParams.get("category")

    let requestBody: Record<string, unknown> = {}

    if (action) {
      requestBody = { action }
    } else if (table) {
      requestBody = {
        method: "GET",
        table,
        filters: category ? { category } : {},
      }
    }

    const response = await fetch(MOAP_API_BASE_URL, {
      method: "POST",
      headers: {
        "x-api-key": MOAP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `MOAP API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[MOAP API Route] Error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
