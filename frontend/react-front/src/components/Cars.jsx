import { useState, useEffect } from "react";
import axios from 'axios';



function Cars(){

    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cars/')
            .then(response => {
                console.log("cars:", response)

                setCars(response.data)
            })
            .catch(error => {
                console.error('There was an error fetching the car data!', error);
            });
    }, [])

    return (
        <div>


        <h1>Car List</h1>
        <ul>
                {cars.map(car => (

                    <li key={car.id}>
                        <h3>{car.name} <br /> {car.model}</h3>
                        <p>$ {car.price_per_day}</p>
                        <img 
                            src={car.image} 
                            alt={car.name} 
                            style={{ width: "200px" }} 
                        />
                    </li>
                ))}
            </ul>
        
        </div>

    )

    

    

}

export default Cars;