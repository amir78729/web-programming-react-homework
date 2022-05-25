import React, {useEffect, useState} from "react";

export const StarShipInfo = ({ starShipData, movieTitle, goBack }) => {
    const [starShips, setStarShips] = useState([]);
    const [index, setIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(starShipData);
        const getData = async (url) => {
            const data = await fetch(url).then((v) =>
                v.json()
            );
            setStarShips(starShips => [...starShips, data]);
            console.log(starShips);
        };
        const getStarShipsData = async () => {
            setIsLoading(true);
            for (const starShipUrl of starShipData) {
                console.log(starShipUrl);
                await getData(starShipUrl);
            }
            setIsLoading(false);
        };
        getStarShipsData();
        console.log(starShips)
    }, []);
    return (
        <section>
            <h2>{movieTitle}</h2>
            <div className="starShipInfosContainer">
                <ul className="starShipList">
                    <div className="header">
                        <button onClick={() => goBack()}>...back</button>
                        {isLoading && <p className="loading">Loading Data...</p>}
                    </div>
                    {starShips.map((starShip, index) => (
                        <li onClick={() => setIndex(index)}>{starShip?.name}</li>
                    ))}
                </ul>
                <div className="starShipInfo">
                    <h3>{starShips[index]?.name || 'Please Select a StarShip'}</h3>
                    <p>model: <b>{starShips[index]?.model}</b></p>
                    <p>manufacturer: <b>{starShips[index]?.manufacturer}</b></p>
                    <p>crew: <b>{starShips[index]?.crew}</b></p>
                    <p>passengers: <b>{starShips[index]?.passengers}</b></p>
                </div>
            </div>
        </section>
    );
};