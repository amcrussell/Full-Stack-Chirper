import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { IUser } from '../types';
import { useNavigate } from 'react-router-dom';

interface HomeProps { }

const Home = (props: HomeProps) => {

    const [user_id, setUser_id] = useState<any>()
    const [userList, setUserList] = useState<IUser[]>([])
    const [body, setBody] = useState<String>('')
    const [mentioned, setMentioned] = useState<Number>(0)
    const [location, setLocation] = useState<String>('')

    const navigate = useNavigate();

    useEffect(() => {
        if (body != '' && user_id != null) {
            fetchData(`/api/chirps/`, 'POST', { user_id, body, location, mentioned });
            navigate('/')
            navigate(0);

        }
    }, [body]);

    useEffect(() => {
        fetchData(`/api/users`)
            .then(userList => {
                setUserList(userList)
            })
    }, []);

    useEffect(() => {
        if (body.includes('@')) {

            let tempString = body.slice(body.indexOf('@'));
            tempString = tempString.substring(1, tempString.indexOf(' '));
            userList.map(user => {
                if (user.handle == tempString) {
                    setMentioned(user.id);
                }
            })
        }
    }, [body])

    let handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            body: { value: string };
            location: { value: string };
        };
        let body = target.body.value;
        if (body.includes('@')) {
            let tempString = body.slice(body.indexOf('@'));
            tempString = tempString.substring(1, tempString.indexOf(' '));
            userList.map(user => {
                if (user.handle == tempString) {
                    setMentioned(user.id);
                }
            })
        }
        setBody(target.body.value);
        setLocation(target.location.value);
    };

    //@ts-ignore
    const handleSelect = (e) => {
        setUser_id(e.target.value);
    }

    return <>
        <main className="container mt-6">
            <section className="row justify-content-center">
                <form onSubmit={handleSubmit} className="mb-6 px-10">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What are you Chirping</label>
                    <input type="text" name='body' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" name='location' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className="relative inline-block text-left">
                        <select
                            value={user_id}
                            onChange={handleSelect}
                            className="block appearance-none w-35 px-8 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Who are you?</option>
                            {userList.map(user => (
                                <option key={`user${user.id}`} value={user.id}>{user.handle}</option>
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
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Chirp it!</button>
                </form>
            </section>
        </main>
    </>

}

export default Home;