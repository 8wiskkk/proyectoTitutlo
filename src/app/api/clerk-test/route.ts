import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    const users = await response.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching Clerk users:", error);
    return NextResponse.json(
      { error: "Error fetching Clerk users" },
      { status: 500 }
    );
  }
}
