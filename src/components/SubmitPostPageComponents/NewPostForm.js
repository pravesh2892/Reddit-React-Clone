import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { BiPoll } from "react-icons/bi"
import { BsLink45Deg, BsMic } from "react-icons/bs"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import { AiFillCloseCircle } from "react-icons/ai"
import { TabItem } from './TabItem'
import { TextInputs } from './PostForms/TextInputs'
import { ImageUpload } from './PostForms/ImageUpload'
import { getHeadersWithUserToken } from '../utils/headersWithUserToken'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

const formTabs = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Images & Video",
        icon: IoImageOutline,
    },
    {
        title: "Link",
        icon: BsLink45Deg,
    },
    {
        title: "Poll",
        icon: BiPoll,
    },
    {
        title: "Talk",
        icon: BsMic,
    },
]

export const NewPostForm = ({ channelId }) => {

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title); // post tab will be selected default

    const [textInputs, setTextInputs] = useState({
        title: "",
        content: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
     
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const [uploadBtnLoading, setUploadBtnLoading] = useState(false);

    const {isDarkMode} = useThemeStore();

    
    const navigateTo = useNavigate();



    async function createPost(postData) {
        
        const config = getHeadersWithUserToken();

        try {
            const response = await axios.post('https://academics.newtonschool.co/api/v1/reddit/post/', postData, config);
            setIsLoading(false);

            if(channelId){
            navigateTo(`/community/${channelId}`);
            }
            else{
                navigateTo('/');
            }

        }
        catch (err) {
            console.log("error in creating post", err)
            setIsLoading(false);
        }

    }

    function handleCreatePost() {

        if(textInputs.title.length > 100){
            setErrorMsg("Title characters can't be more than 100");
            return;
        }
        
        setIsLoading(true);
        const postData = new FormData();

        postData.append('title', textInputs.title);
        postData.append('content', textInputs.content);
        if(channelId){
        postData.append('channelId', channelId);
        }

        if (uploadedImage) {  
            postData.append('images', uploadedImage, uploadedImage.name);
            // console.log("uploading image", uploadedImage);
          }

         


        createPost(postData);

    }

    function onSelectImage(e) {

        setUploadBtnLoading(true);
        const reader = new FileReader();

        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setUploadedImage(e.target.files[0]); // by uploadedImage state I will send in api 
            console.log("selected images", e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result); // by selectedFile state I will dispay on ui
            }
        };



    };

    function handleInputChange(e) {

        if(errorMsg){
            setErrorMsg('');
        }
        const { name, value } = e.target;

        setTextInputs((prev) => {
            return { ...prev, [name]: value }
        })


    }


    return (
        <Flex direction="column" bg={isDarkMode ? "#1a1a1b" : "white"} borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item, index) => (
                    <TabItem item={item} key={index} isSelected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
            </Flex>

            <Flex p={4}>
                {selectedTab === "Post" && <TextInputs
                    textInputs={textInputs}
                    handleInputChange={handleInputChange}
                    handleCreatePost={handleCreatePost}
                    isLoading={isLoading}
                    errorMsg={errorMsg}
                />}

                {selectedTab === "Images & Video" && <ImageUpload
                    selectedFile={selectedFile}
                    onSelectImage={onSelectImage}
                    setSelectedTab={setSelectedTab}
                    setSelectedFile={setSelectedFile}
                    setUploadedImage={setUploadedImage}
                    uploadBtnLoading={uploadBtnLoading}
                    setUploadBtnLoading={setUploadBtnLoading}
                />}
            </Flex>

        </Flex>
    )
}
