import React, { useState } from 'react';
import { dbService, storageService } from '../firebase';

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("ㄹㅇ로 삭제할 거? ㅋㅋ");
        console.log(ok);
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev); // 기존 값 반대를 출력
    const onSubmit = async (event) => {
        event.preventDefault();
        /* await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        toggleEditing(); */

    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    }

    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Edit your Nweet" onChange={onChange} value={newNweet} />
                    <input type="submit" value="Edit"/>
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && (
                <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                )}
                {isOwner && (
                    <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEditing}>Edit</button>
                    </>
                )}
                </>
            )}            
        </div>
    )
}

export default Nweet;