import React from 'react'
import { notFound } from "next/navigation";

const idList = [11, 12, 13, 14, 15, 16, 17];

export default async function DishPage({ params }) {

    const getId = await params;
    const dishId = Number(getId.id);
    
    if (!idList.includes(dishId)) notFound();

  return (
    <div>Dish Id: {getId.id}</div>
  )
}
