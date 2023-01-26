import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    
    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
            .then(res => res.json())
            .then((locationArray) => {
                setLocations(locationArray)
                })
        },
        []
    )

    return <>
        <h2>Locations List</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`}>
                            <header>Location #{location.id}</header>
                            <div>{location.address}</div>
                            <footer>Square Footage: {location.squareFootage}</footer>
                        </section>
                    }

                )
            }

        </article>

    </>
}