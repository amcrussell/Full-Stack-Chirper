import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { IUser } from '../types';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    id?: number;
    body?: string;
    hidden?: boolean;
 }

const Home = (props: HomeProps) => {

    const [userList, setUserList] = useState<IUser[]>([])
    const [body, setBody] = useState<String>('')
    const [mentioned, setMentioned] = useState<Number>(0)

    const navigate = useNavigate();

    useEffect(() => {
        if (body != '') {
            let id = props.id;
            fetchData(`/api/chirps/edit/${props.id}`, 'PUT', { id, body, mentioned });
            navigate(0);

        }
    }, [body]);

    useEffect(() => {
        fetchData(`/api/users`)
            .then(userList => {
                setUserList(userList)
            })
    }, []);

    let handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            body: { value: string };
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
    };
    
    if(!props.hidden){ 
        return <></>
    }else return <div>
        <main className="container mt-6">
            <section className="row justify-content-center">
                <form onSubmit={handleSubmit} className="mb-6 px-10">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What should it say instead?</label>
                    <input type="text" name='body' placeholder={props.body} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Chirp it!</button>
                </form>
            </section>
        </main>
    </div>

}

export default Home;