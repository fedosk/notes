import React, {useEffect} from 'react';
import './App.scss';
import {HashTagSidebar} from "./componets/HashtagSidebar/HashtagSidebar";
import {Notes} from "./componets/Notes/Notes";
import {getNotesDataTC} from "./app-reducer";
import {useDispatch} from "react-redux";


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotesDataTC())
    }, [])

    return (
        <div className="App">
            <div className="container">
                <div className='main-wrapper'>
                    <HashTagSidebar/>
                    <Notes/>
                </div>
            </div>
        </div>
    );
}

export default App;