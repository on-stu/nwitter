import react from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../firebase';

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/')
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}