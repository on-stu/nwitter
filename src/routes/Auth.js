import react, { useState } from 'react';
import { authService, firebaseInstance } from '../firebase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); /* 이걸 Hooks라고 하는 듯... 아마 뒤에 꺼로 앞의 것 값을 바꿔주는 것 같음 */
    const [NewAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault(); /* 기본행위를 실행하지 말아라! */
        try{
            let data;
            if(NewAccount){data = await authService.createUserWithEmailAndPassword(
                email,
                password
              );
            } else {
              data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }
        catch(error){
            setError(error.message);
        }
        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev); //기존 값의 반대를 출력하는 함수
    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="E-mail" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" onChange={onChange} value={password} required />
            <input type="submit" value={NewAccount ? "Create Account" : "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>
            {NewAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
            <button name="google" onClick={onSocialClick}>Start with Google</button>
        </div>
    </div>
    );
};
export default Auth;