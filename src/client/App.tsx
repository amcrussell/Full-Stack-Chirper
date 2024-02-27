import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

interface AppProps { }

const App = (props: AppProps) => {

	return<>
		<BrowserRouter>
			<div>
				<Link to='/'>Home</Link>
				<Link to='/chirps'>Chirps</Link>
				<Link to='/chirps/new'>Create Chirp</Link>
			</div>
			<Routes>
				<Route path='/' element={<h1>home</h1>}></Route>
				<Route path='/chirps' element={<h1>chirps</h1>}></Route>
				<Route path='/chirps/new' element={<h1>add chirp</h1>}></Route>
				<Route path='/chirps:id' element={<h1>chirp singular</h1>}></Route>
				<Route path='/mentions' element={<h1>mentions</h1>}></Route>
				<Route path='/admin' element={<h1>admin</h1>}></Route>
				<Route path='*' element={<h1>missing</h1>}></Route>
			</Routes>
		</BrowserRouter>
	</>;
};

export default App;