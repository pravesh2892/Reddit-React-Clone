import { Heading } from "@chakra-ui/react";
import "../styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CommunityPage } from "../pages/CommunityPage/CommunityPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { SubmitPostPage } from "../pages/SubmitPostPage/SubmitPostPage";
import { EditPostPage } from "../pages/EditPostPage/EditPostPage";
import { CommentPage } from "../pages/CommentPage/CommentPage";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { RedditPremium } from "../pages/RedditPremium/RedditPremium";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { CommunityNotFound } from "./CommunityPageComponent/CommunityNotFound";
import CommingSoon from "../pages/CommingSoon/CommingSoon";

function App() {
  return (
    
    <div >
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community/:channelId" element={<CommunityPage />} />
        <Route path="/submitpost" element={<SubmitPostPage />} />
        <Route path="/editpost" element={<EditPostPage />} />
        <Route path="/comment/:postId" element={<CommentPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/redditpremium" element={<RedditPremium />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/*" element={<CommunityNotFound />} />
        <Route path="/commingsoon" element={<CommingSoon />}/>
       </Routes>
    </div>
    
  )
}

export default App;
