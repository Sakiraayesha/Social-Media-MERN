import './home.css';

import Header from "../../components/header/header";
import Leftbar from "../../components/leftbar/leftbar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";

function Home(){
    return (
        <>
            <Header/>
            <div className="homeContainer">
                <Leftbar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Home;