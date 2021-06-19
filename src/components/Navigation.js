import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({userObj}) => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Profile">{userObj.displayName.length ? `${userObj.displayName}'s Profile`: "Profile"}</Link></li>
        </ul>
    </nav>
) // 이거 중괄호는 안되고 괄호만 되는데 왜 그런지 정확히는 모르겠다.

export default Navigation;