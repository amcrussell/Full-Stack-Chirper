import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { IUser } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import EditChirp from './EditChirp';

interface HomeProps {
    id: number;
    body: string;
    location: string;
    user_id: number;
    created_at: string;
    admin?: boolean;
}

const Home = (props: HomeProps) => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser>();
    const [body, setBody] = useState<string[]>([]);
    const [targetUser, setTargetUser] = useState<number>();
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const navigate = useNavigate();
    let sentence = props.body.split(' ');
    let mentionedUser = 0;

    useEffect(() => {
        fetchData(`/api/users`)
            .then(userList => {
                setUserList(userList)
                //@ts-ignore
                userList.map(user => {
                    if (user.id === props.user_id) {
                        setUser(user);
                    }
                })
            })
    }, []);



    useEffect(() => {
        let sentenceArray = [''];
        let tempString = '';

        sentence.map(word => {
            if (word.includes('@')) {
                sentenceArray.push(tempString);
                tempString = word + ' ';
                sentenceArray.push(tempString);
                tempString = '';
            } else {
                tempString += word + ' ';
            }
        })
        sentenceArray.push(tempString);

        setBody(sentenceArray);

    }, [userList]);

    useEffect(() => {
        setTargetUser(mentionedUser);
    }, [userList])

    if (props.body.includes('@')) {
        let atSign = '';

        props.body.split(' ').map(word => {
            if (word.includes('@'))
                atSign = word.substring(1);
        });

        // @ts-ignore
        userList.map(user => {
            if (user.handle === atSign) {
                mentionedUser = user.id;
                sentence[sentence.indexOf(`@${atSign}`)] = `@${atSign}`;
            }
        });
    }

    const deleteChirp = () => {
        fetchData(`/api/chirps/delete/${props.id}`, 'DELETE')
        navigate(0);
    }
    const editChirp = () => {
        //fetchData(`/api/chirps/delete/${props.id}`, 'DELETE')
        setShowEdit(true);
    }

    const ShowAdmin = () => (<div className='grid-rows-2'>
        <button onClick={deleteChirp} className='nline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'>
            <p>delete</p>
        </button>
        <div onClick={editChirp} className='w-fit text-center self-center nline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'>
            <p>edit</p>
            <EditChirp id={props.id} body={props.body} hidden={showEdit}/>
        </div>
    </div>
    )

    return <div>
        <li className='list-item ' key={`chirp-${props.id}-id`}>
            <main className="max-w-md rounded overflow-hidden shadow-lg ">
                <div className='px-6 py-4 '>
                    <div className='font-bold text-xl mb-2'>
                        <Link to={`/chirps/mentions/${props.user_id}`}><span className='text-slate-800 text-base'>{user ? user.handle : 'loading'}</span></Link>
                        <span className='text-slate-800 text-base'></span>
                    </div>
                    <div className="px-6 pt-4 pb-2 text-slate-600">
                        <span>{body[1]}<Link className='text-red-600' to={`../chirps/mentions/${targetUser}`}>{body[2]}</Link>{body[3]}</span>
                    </div>
                    <div className="py-3 text-slate-500">
                        <span>chirped from {props.location}</span>
                        <p>{props.created_at}</p>
                    </div>
                    <Link to={`/chirps/${props.id}`} className="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">details</Link>
                </div>
                { props.admin ? <ShowAdmin></ShowAdmin> : null}
            </main>
        </li>
    </div>

}

export default Home;