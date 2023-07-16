import React from 'react'

function Meal({m}) {
    console.log(m);
  return (
    <div className="card">
            <img
                src={m.strMealThumb}
                alt="image repas"
            />
            <h3>{m.strMeal}</h3>
            <p>Origine: {m.strArea}</p>
            <p>{m.strInstructions}</p>
        </div>
  )
}

export default Meal