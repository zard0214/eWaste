import Header from "../components/Header";
import Profile from "../components/User";
import React from "react";


const UserProfile = ({ currentUser,state })=>{
    return(
        <div>
            <Header />
            <Profile currentUser={currentUser} state={state} />
        </div>
    );
}

export default UserProfile