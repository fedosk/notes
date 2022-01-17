import React from 'react';
import './App.scss';
import {HashTagSidebar} from "./componets/HashtagSidebar/HashtagSidebar";
import {Notes} from "./componets/Notes/Notes";


function App() {
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