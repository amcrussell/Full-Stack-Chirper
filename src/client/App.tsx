import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import AddChirp from './views/AddChirp';
import ChirpDetails from './views/ChirpDetails';
import Mentions from './views/Mentions';
import Admin from './views/Admin';
import NotFound from './views/NotFound';
import EditChirp from './views/EditChirp';

interface AppProps { }

const App = (props: AppProps) => {

	return<div className=' mt-10 ml-36 '>
		<BrowserRouter >
			<div className='grid grid-cols-4 divide-x text-center text-slate-300 bg-blue-700 h-10 '>
				<Link to='/'>Home</Link>
				<Link to='/chirps/new'>Create Chirp</Link>
				<Link to='/chirps/mentions/1'>Mentions</Link>
				<Link to='/admin'>Admins Only</Link>
			</div>
			<Routes>
				<Route path='/' element={<Home></Home>}></Route>
				<Route path='/chirps' element={<Home></Home>}></Route>
				<Route path='/chirps/new' element={<AddChirp></AddChirp>}></Route>
				<Route path='/chirps/:id' element={<ChirpDetails></ChirpDetails>}></Route>
				<Route path='/chirps/mentions/:id' element={<Mentions id={1} ></Mentions>}></Route>
				<Route path='/admin' element={<Admin></Admin>}></Route>
				<Route path='/admin/edit' element={<EditChirp></EditChirp>}></Route>
				<Route path='*' element={<NotFound></NotFound>}></Route>
			</Routes>
		</BrowserRouter>
	</div>;
};

export default App;