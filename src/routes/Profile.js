import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../firebase';

export default ({userObj, refreshUser}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/')
    }

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const getMyName = async() => {
        const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createAt").get();
        console.log(nweets.docs.map((doc) => doc.data()));
    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(newDisplayName !== userObj.displayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();
        }
    }

    useEffect(() => {
        getMyName();
    }, [])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} /><input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}