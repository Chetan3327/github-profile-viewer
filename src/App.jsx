import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css"

const App = () => {
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState({});
  const handleSubmit = () => {
    if(userId === ''){
      return
    }
    axios.get(`https://api.github.com/users/${userId}`).then((response) => {
      setProfile(response.data);
    });
  };
  return (
    <div className="App">
      <div className="Container">
        <div className="Header">
          <h1>GitHub Profile Viewer</h1>
        </div>
        <div className="Controls">
          <input type="text" placeholder="Enter GitHub username" autoFocus onChange={(e) => setUserId(e.target.value)} />
          <button type="button" onClick={handleSubmit}>Search</button>
        </div>
        {profile.login && (
          <div className="Profile">
            <div className="ProfileHeader">
              <img src={profile.avatar_url} alt={profile.login} />
              <div className="ProfileInfo">
                <h2>{profile.name}</h2>
                <p>@{profile.login}</p>
                <p>{profile.bio}</p>
              </div>
            </div>
            <div className="ProfileStats">
              <div>
                <span>{profile.followers}</span> Followers
              </div>
              <div>
                <span>{profile.following}</span> Following
              </div>
              <div>
                <span>{profile.public_repos}</span> Repositories
              </div>
            </div>
          </div>
        )}
        {profile.login && (<div className="ProfileStatsImages">
          <img src={`https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true&theme=radical`} alt="Gitstats" align="center" style={{width: '50%'}} />
          <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&layout=compact`} alt="top-langs-stats" align="center" style={{width: '50%'}} />
        </div>)}
      </div>
    </div>
  );
};

export default App;