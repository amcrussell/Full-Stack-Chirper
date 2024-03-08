import React, { useEffect, useState } from 'react';
import { IChirps } from '../types';
import { fetchData } from '../services/fetchData';
import Chirps from './Chirps';
import { Link, useNavigate } from 'react-router-dom';

interface HomeProps { }

const Home = (props: HomeProps) => {

    const [list, setList] = useState<IChirps[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        fetchData('/api/chirps')
            .then(list => setList(list));
    }, []);
    if (list[0] === undefined) {
        return <h1>loading</h1>;
    }
    return <>
        <main className="mt-10 mb-20">
            <section className="">
                <ul className="">
                    {list.map(chirp => (
                        <Chirps key={`chirp-${chirp.id}-${chirp.user_id}`} id={chirp.id} body={chirp.body} location={chirp.location} user_id={chirp.user_id} created_at={chirp.created_at} admin={true}></Chirps>
                    ))}
                </ul>
            </section>
        </main>
    </>

}

export default Home;