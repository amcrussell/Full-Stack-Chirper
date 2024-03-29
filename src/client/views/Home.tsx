import React, { useEffect, useState } from 'react';
import { IChirps } from '../types';
import { fetchData } from '../services/fetchData';
import Chirps from './Chirps';

interface HomeProps { }

const Home = (props: HomeProps) => {


    const [list, setList] = useState<IChirps[]>([]);

    useEffect(() => {
        fetchData('/api/chirps')
            .then(list => setList(list));
    }, []);
    
    if(list[0] === undefined){
        return<h1>loading</h1>;
    }
    return <>
        <main className="mt-10 mb-20">
            <section className="">
                <ul className="">
                    {list.map(chirp => (
                        <Chirps key={`chirp-${chirp.id}`} id={chirp.id} body={chirp.body} location={chirp.location} user_id={chirp.user_id} created_at={chirp.created_at}></Chirps>
                    ))}
                </ul>
            </section>
        </main>
    </>

}

export default Home;