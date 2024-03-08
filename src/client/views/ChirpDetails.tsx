import React, { useEffect, useState } from 'react';
import { IChirps } from '../types';
import { fetchData } from '../services/fetchData';
import Chirps from './Chirps';
import { Link, useParams } from 'react-router-dom';

interface HomeProps {}

const Home = (props: HomeProps) => {
    let id = useParams();
    const [chirp, setChirp] = useState<IChirps>();

    useEffect(() => {
        fetchData(`/api/chirps/${id.id}`)
            .then(chirp => setChirp(chirp));
    }, []);
    
    if(chirp === undefined){
        return<h1>loading</h1>;
    }

    return <div>
        <main className="mt-10 mb-20">
            <section className="">
                <ul className="">
                    <Chirps id={chirp.id} body={chirp.body} location={chirp.location} user_id={chirp.user_id} created_at={chirp.created_at}></Chirps>
                </ul>
                <Link to={`../..`}>See All Chirps</Link>
            </section>
        </main>
    </div>

}

export default Home;