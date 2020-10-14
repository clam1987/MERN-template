import React from "react";
import axios from "axios";
import { useAuth } from "../../utils/auth/"
import API from "../../utils/axios/API";
import './LandingPage.css';

const LandingPage = () => {
    const { user, logout } = useAuth();
    const fullName = (user) => `${user.firstName} ${user.lastName}`
    return (
        <div id="parallax-world-of-ugg">
                  <button onClick={logout}>Logout</button>
        <section>
          <div className="title">
        <h3>{user.username}</h3>
    <h1>{fullName(user)}</h1>
          </div>
        </section>
        
        <section>
            <div class="parallax-one">
              <h2>SOUTHERN CALIFORNIA</h2>
            </div>
        </section>

        <section onClick={() => API().then(x => console.log(x.data))}>Try clicking this now and open your console, then delete your token from your localstorage and try to click the button again</section>
        </div>
    )
};

export default LandingPage;