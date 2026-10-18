import useFetchDishes from "@/hooks/useFetchDishes";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { dishes } = useFetchDishes();
    const q = request.nextUrl.searchParams.get("q").toLowerCase();
    const result = q
        ? dishes.find(d => d.slug.toLowerCase().includes(q))
        : dishes;
    return NextResponse.json(result);
}