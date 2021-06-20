import react, { useEffect, useState } from 'react';
import { dbService, storageService } from '../firebase';
import Nweet from '../components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPaperPlane, faUpload } from '@fortawesome/free-solid-svg-icons';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    /* const getNweats = async() => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach(document => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
        });
    } */ 
    //위 방식은 좀 구식이란다.. realtime 지원 ㄴㄴ

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNweets(nweetArray);
          });
        }, []);
    

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
          const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(attachment, "data_url");
          attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text : nweet,                       
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => {
        setAttachment("");
    }
    
    return (
      <div className="container_h">
      <div className="sub_container">
        <div className="form_container">
        <form onSubmit={onSubmit}>
          <input
            className="content"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            required
          />
          <label for="file_input"><FontAwesomeIcon icon={faCamera} size="2x" color="#0455BF"/></label>
          <input className="attat" id="file_input" type="file" accept="image/*" onChange={onFileChange}/>
          <button className="subm" type="submit" value="Nweet"><FontAwesomeIcon icon={faPaperPlane} size="2x" color="#0455BF"/></button>
          {attachment && <div>
                <img src={attachment} height="50px" width="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
              }
            
        </form>
        </div>
        <div className="nweet_container">
        {nweets.map((nweet) => (
            <h1><Nweet id="nweeting"key={nweet.createdAt} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/></h1>
        ))}
        </div>
      </div>
      </div>
    );
  };
  export default Home;