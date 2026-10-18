import { NextResponse } from "next/server";
import useFetchDishes from "@/hooks/useFetchDishes";

export async function GET({ params }) {
  const { dishes } = useFetchDishes();
  const { slug } = await params;
  const dish = dishes.find(d => d.slug === slug)

  if (!dish) {
    return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  }
  return NextResponse.json(dish);
}