import React, { useEffect, useState } from "react";
import axios from "axios";
import Meal from "./Meal";
import "/src/index.css";

export default function Card() {
    const [repas, setRepas] = useState([]);
    const [searchvalue, setvalue] = useState("fish");
    const [nbResult, setNbResult] = useState(5);

    // Si vrais triage en ordre croissant si faux en ordre décroissant
    const [sortMethod, setSortMethod] = useState(true);

    function fetchMeals() {
        axios({
            method: "get",
            url:
                "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                searchvalue,
        }).then((result) => {
            setRepas(result.data.meals);
        });
    }

    useEffect(fetchMeals, [searchvalue]);

    return (
        <>
            <div className="navigation">
                <ul>
                    <li>
                        <h3>THEMEALBOOK</h3>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            onChange={(e) => {
                                setvalue(e.target.value);
                            }}
                        />
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setSortMethod(!sortMethod);
                            }}
                        >
                            {sortMethod ? "Croissant" : "Décroissant"}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="range">
                <input
                    type="range"
                    defaultValue={nbResult}
                    onInput={(e) => {
                        setNbResult(e.target.value);
                    }}
                    min={1}
                    max={50}
                />
                <span>{nbResult}</span>
            </div>
            <div className="card-container">
                {repas &&
                    repas
                        .sort((m1, m2) => {
                            return sortMethod
                                ? // Si vrais
                                  m1.strMeal
                                      .toLowerCase()
                                      .localeCompare(m2.strMeal.toLowerCase())
                                : // Si faux
                                  m2.strMeal
                                      .toLowerCase()
                                      .localeCompare(m1.strMeal.toLowerCase());
                        })
                        .slice(0, nbResult)
                        .map((m, index) => <Meal m={m} key={index} />)}
            </div>
        </>
    );
}
