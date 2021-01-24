import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

export default function Nav() {
    const { currentUser } = useAuth();
    return (
        <nav className="Nav">
            <div className="Nav__container mb-5">
                {/* <Link to="/" className="Nav__brand">
              <img src="logo.svg" className="Nav__logo" />
            </Link> */}

                <div className="Nav__right">
                    <ul className="Nav__item-wrapper">
                        <li className="Nav__item">
                            <Link className="Nav__link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="Nav__item">
                            <Link className="Nav__link" to={"/about"}>
                                Bio
                            </Link>
                        </li>
                        <li className="Nav__item">
                            <Link className="Nav__link" to={"/gallery"}>
                                Portfolio
                            </Link>
                        </li>
                        <li className="Nav__item">
                            <Link className="Nav__link" to={"/digitals"}>
                                Digitals
                            </Link>
                        </li>
                        <li className="Nav__item">
                            <Link className="Nav__link" to={"/contact"}>
                                Scheduling
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}