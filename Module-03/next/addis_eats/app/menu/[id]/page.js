import React from 'react'
import { notFound } from "next/navigation";

const idList = [11, 12, 13, 14, 15, 16, 17];

// pre-build dnamic pages
export function generateStaticParams() {
  return idList.map(list => ({ id: list }))
}

export default async function DishPage({ params }) {

    const getId = await params;
    const dishId = Number(getId.id);
    
    if (!idList.includes(dishId)) notFound();

  return (
    <div>Dish Id: {getId.id}</div>
  )
}
