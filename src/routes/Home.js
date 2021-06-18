import react, { useEffect, useState } from 'react';
import { dbService } from '../firebase';
import Nweet from '../components/Nweet'

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
      await dbService.collection("nweets").add({
        text : nweet,                       
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet("");
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
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
    }

    const onClearAttachment = () => {
        setAttachment(null);
    }
    
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange}/>
          <input type="submit" value="Nweet" />
          {attachment && <div>
                <img src={attachment} height="50px" width="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
              }
        </form>
        <div>
        {nweets.map((nweet) => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
        </div>
      </div>
    );
  };
  export default Home;