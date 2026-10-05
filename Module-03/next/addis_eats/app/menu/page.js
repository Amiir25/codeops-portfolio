import React, { Suspense } from 'react'
import FilterShell from '../../components/FilterShell';
import DishList from './DishList';

// marks as static
export const revalidate = 0;

export default async function Menu() {
  const res = await fetch("http://localhost:3000/dishes.json");
  const dishes = await res?.data;

  if (dishes) console.log(dishes)

  return (
    <div>
      <h2>Menu Page</h2>
      
      <Suspense>
        {dishes?.map(dish => (
          <FilterShell>
            <DishList key={dish.id} dish={dish} />
          </FilterShell>
        ))}      
      </Suspense>
    </div>
  )
}
