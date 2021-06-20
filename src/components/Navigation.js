import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({userObj}) => (
    <nav>
        <ul className="nav_container">
            <li><Link className="navL" to="/"><span><FontAwesomeIcon icon={faHome} size="2x" color="#0455BF"/></span><p>&nbsp;</p></Link></li>
            <li className="user_container"><Link className="navL" to="/Profile">
                <span><FontAwesomeIcon icon={faUser} size="2x" color="#0455BF" /></span>
                <p align="center">{userObj.displayName}의 Profile</p>
                </Link>
            </li>
        </ul>
    </nav>
) // 이거 중괄호는 안되고 괄호만 되는데 왜 그런지 정확히는 모르겠다.

export default Navigation;