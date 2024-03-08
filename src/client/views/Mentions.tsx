import React, { useEffect, useState } from 'react';
import { IChirps, IUser } from '../types';
import { fetchData } from '../services/fetchData';
import Chirps from './Chirps';
import { useNavigate, useParams } from 'react-router-dom';

interface HomeProps { 
    id:number;
}

const Home = (props: HomeProps) => {

    let id = useParams();

    const [list, setList] = useState<IChirps[]>([]);
    const [userList, setUserList] = useState<IUser[]>([])
    const [currentId, setCurrentId] = useState<any>();

    const navigate = useNavigate();
    useEffect(() => {
    fetchData(`/api/chirps/user/${id.id}`)
            .then(list => setList(list));
            
    }, [currentId]);

    useEffect(() => {
        fetchData(`/api/users`)
            .then(userList => {
                setUserList(userList)
            })
    }, []);

    if(currentId !== id.id){
        setCurrentId(id.id);

    }

    if(list[0] === undefined){
        return<h1>loading</h1>;
    
    }


    //@ts-ignore
    const handleSelect = (e) => {
        setCurrentId(e.target.value);
        navigate(`./../${e.target.value}`)
    }

    return <>
        <main className="mt-10 mb-20">
            <section className="">
                <ul className="">
                <div className="relative inline-block text-left">
                        <select
                            value={currentId}
                            onChange={handleSelect}
                            className="block appearance-none w-35 px-8 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Who are you?</option>
                            {userList.map(user => (
                                <option key={`user_${user.id}`} value={user.id}>{user.handle}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    {list.map(chirp => (
                        <Chirps key={`chirp-${chirp.id}`} id={chirp.id} body={chirp.body} location={chirp.location} user_id={chirp.user_id} created_at={chirp.created_at}></Chirps>
                    ))}
                </ul>
            </section>
        </main>
    </>

}

export default Home;