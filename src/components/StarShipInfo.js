import React, {useEffect, useState} from "react";

const LIMIT = 5;

export const StarShipInfo = ({ starShipUrls, movieTitle, goBack }) => {
    const [starShips, setStarShips] = useState([]);
    const [index, setIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log("use effect called")
        const fetchedData = [];
        const getData = async (url) => {
            const data = await fetch(url).then((v) =>
                v.json()
            );
            fetchedData.push(data);
        };
        const getStarShipsData = async () => {
            setIsLoading(true);
            for (const starShipUrl of starShipUrls) {
                console.log(starShipUrl);
                await getData(starShipUrl);
            }
            setIsLoading(false);
            setStarShips(fetchedData);
        };
        getStarShipsData();
    }, []);

    const max = starShips.length / LIMIT + 1;

    return (
        <section>
            <h2>{movieTitle}</h2>
            <div className="starShipInfosContainer">
                <ul className="starShipList">
                    <div className="header">
                        <button onClick={() => goBack()}>...back</button>
                        {isLoading && <p className="loading">Loading Data...</p>}
                    </div>
                    {starShips.slice((page - 1) * LIMIT, (LIMIT * page)).map((starShip, index) => (
                        <li onClick={() => setIndex(index + (page - 1) * LIMIT )}>{starShip?.name}</li>
                    ))}
                    <footer>
                        <button onClick={() => {if(page > 1) setPage((page) => page -1)}}>prev</button>
                        <h2>Page {page}</h2>
                        <button onClick={() => {if(page <= max) setPage((page) => page +1)}}>next</button>
                    </footer>
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
