import React from 'react';
import userIcone from '../../images/User_icon_2.svg.png';
import navbar from './Navbar.module.css'
import Infobar from '../infoBar/Infobar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useMemberData from '../../customHooks/useMemberSectionHook';
import logo from '../../images/oab-logo.png'
import useAboutData from '../../customHooks/useAboutSectionHook';
import useAdvertiseData from '../../customHooks/useAdvertiseSectionHook';
import useBannerData from '../../customHooks/useBannerSectionHook';
import useGalleryData from '../../customHooks/useGallerySectionHook';
import useBlogData from '../../customHooks/useBlogSectionHook';

const Navbar = ({ setDarkmode, darkmode, navScroll }) => {

    const [aboutData] = useAboutData();
    const [advertiseData] = useAdvertiseData();
    const [bannerData] = useBannerData();
    const [galleryData] = useGalleryData();
    const [blogData] = useBlogData();


    const navigate = useNavigate();
    const [signOut] = useSignOut(auth);
    const [user] = useAuthState(auth);
    const [memberData] = useMemberData();
    const allMember = memberData?.data?.data?.data;

    const findMember = allMember?.find(f => {
        return f.email === user?.email
    })

    const handleDarkMode = () => {
        if (darkmode === false) {
            setDarkmode(true)
        } else if (darkmode === true) {
            setDarkmode(false)
        }
    }

    if (aboutData?.data?.statusCode !== 200 || advertiseData?.data?.statusCode !== 200 || bannerData?.data?.statusCode !== 200 || galleryData?.data?.statusCode !== 200 || blogData?.data?.statusCode !== 200 || memberData?.data?.statusCode !== 200) {
        return <div></div>
    }

    return (
        <div className={navbar.navbarTheMain}>
            <Infobar></Infobar>
            <div className={`${navbar.navbarTheContainer} print:hidden`}>
                <div style={{ transition: '1s ease-in-out', height: '100px' }} className={`navbar ${darkmode ? `${navbar.module_border_wrap}  ` : `${navScroll ? navbar.module_border_wrap_active : navbar.module_border_wrap}`} `}>

                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex="0" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokLinejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>

                            <ul style={{ zIndex: 25 }} tabIndex="0" className={`menu menu-sm dropdown-content mt-3 z-[1] p-2  rounded-box w-52 ${darkmode ? 'bg-blue-950 text-white border-2 border-white' : 'shadow bg-base-100'}`}>
                                <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/'>Home</Link></li>

                                <li>
                                    <details>
                                        <summary className={`${darkmode && 'hover:text-orange-500'} `}>
                                            About Us
                                        </summary>

                                        <ul className='bg-blue-500'>
                                            <li>
                                                <Link
                                                    className={`${darkmode && 'hover:text-orange-500'} `} to='/committee'>
                                                    Committee
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={`${darkmode && 'hover:text-orange-500'} `} to='/founder'>
                                                    Founder
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/blogs'>Blogs</Link></li>
                                <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/publication'>Publications</Link></li>
                                <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/gallery'>Gallery</Link></li>
                                <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/events'>Events</Link></li>

                                <li>
                                    <a href='##'>view more</a>
                                    <ul className="p-2">
                                        {
                                            user?.email &&
                                            <li>
                                                <span className='text-green-500' title={user?.email}><Link to='/' className={`${darkmode && 'hover:text-orange-500'} `} >{user?.email.length > 17 ? user?.email?.slice(0, 17) + '...' : user?.email}</Link></span>
                                            </li>
                                        }
                                        {
                                            (user?.email === findMember?.email && findMember?.approval && findMember?.isSignOut === false && user?.emailVerified === true) &&
                                            <li>
                                                <span className={`${darkmode && 'hover:text-orange-500'} `}> <i class="uil uil-user-plus"></i> <Link to='/myProfile'  >profile</Link></span>
                                            </li>
                                        }
                                        {
                                            (user?.email === findMember?.email && findMember?.isSignOut === false && findMember?.isAdmin === true && findMember?.approval === true && user?.emailVerified === true) &&

                                            <li>
                                                <span className={`${darkmode && 'hover:text-orange-500'} `} ><i class="uil uil-sliders-v"></i><Link to='./panelBoard'>Controll Panel</Link></span>
                                            </li>
                                        }

                                        {(user?.email === findMember?.email && findMember?.isSignOut === false && findMember?.approval === true && findMember?.isAdmin === false && user?.emailVerified === true) &&

                                            <li>
                                                <span className={`${darkmode && 'hover:text-orange-500'} `} ><i class="uil uil-setting"></i><Link to='./dashboard'>Dashboard</Link></span>
                                            </li>
                                        }

                                        <li>
                                            <span><i class="uil uil-signin"></i><Link className={`${darkmode && 'hover:text-orange-500'} `} to='./login'>Login</Link></span>
                                        </li>
                                        {
                                            (user?.email && user?.emailVerified === true) &&
                                            <li>
                                                <span><i class="uil uil-signin"></i><Link className={`${darkmode && 'hover:text-orange-500'} `} to='./memberLogin'>Member Login</Link></span>
                                            </li>
                                        }

                                        <li>
                                            <span
                                                onClick={async () => {
                                                    const success = await signOut();
                                                    console.log(success);
                                                    if (success) {
                                                        alert('You are sign out');
                                                        localStorage.removeItem('oab-access-token')
                                                        navigate('/login');
                                                    }


                                                }}
                                            ><i class="uil uil-signout"></i> <a className={`${darkmode && 'hover:text-orange-500'} `} href='###'>Logout</a></span>
                                        </li>
                                        <li>
                                            <span className={`${darkmode && 'hover:text-orange-500'} `} onClick={handleDarkMode} ><i class={`uil ${darkmode ? 'uil-brightness-low' : 'uil-moon'}`}></i>{darkmode ? <p>Light mode</p> : <p>Dark mode</p>}</span>
                                        </li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                        <img className={navbar.logo} onClick={() => navigate('/')} style={{ height: '90px', width: '160px', cursor: 'pointer' }} src={logo} alt="" />
                        <img className={navbar.logoRes} onClick={() => navigate('/')} style={{ height: '60px', width: '100px', cursor: 'pointer' }} src={logo} alt="" />
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <ul className={`menu menu-horizontal px-2 font-medium text-white  ${darkmode && 'text-white '}`}>

                            <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/'>Home</Link></li>
                            <li>
                                <details style={{ position: 'relative' }}>
                                    <summary className={`${darkmode && 'hover:text-orange-500'} `}>
                                        About Us
                                    </summary>

                                    <ul style={{ position: 'absolute', top: '60px' }} className='bg-blue-500'>
                                        <li>
                                            <Link
                                                className={`${darkmode && 'hover:text-orange-500'} `} to='/committee'>
                                                Committee
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={`${darkmode && 'hover:text-orange-500'} `} to='/founder'>
                                                Founder
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/blogs'>Blogs</Link></li>
                            <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/publication'>Publications</Link></li>
                            <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/gallery'>Gallery</Link></li>
                            <li><Link className={`${darkmode && 'hover:text-orange-500'} `} to='/events'>Events</Link></li>


                        </ul>
                        <div className="dropdown dropdown-end">
                            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={userIcone} alt=''></img>
                                </div>
                            </label>
                            <ul style={{ transition: '.3s ease-in-out' }} tabindex="0" className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${darkmode ? 'bg-blue-950 text-white border-white border-2' : 'bg-base-100'} `}>
                                {
                                    user?.email &&
                                    <li>
                                        <span className='text-green-500' title={user?.email}><Link to='/' className={`${darkmode && 'hover:text-orange-500'} `} >{user?.email?.length > 23 ? user?.email?.slice(0, 23) + '...' : user?.email}</Link></span>
                                    </li>
                                }
                                {
                                    (user?.email === findMember?.email && findMember?.approval && findMember?.isSignOut === false && user?.emailVerified === true) &&
                                    <li>
                                        <span className={`${darkmode && 'hover:text-orange-500'} `}> <i class="uil uil-user-plus"></i> <Link to='/myProfile'  >profile</Link></span>
                                    </li>
                                }
                                {
                                    (user?.email === findMember?.email && findMember?.isSignOut === false && findMember?.isAdmin === true && findMember?.approval === true && user?.emailVerified === true) &&

                                    <li>
                                        <span className={`${darkmode && 'hover:text-orange-500'} `} ><i class="uil uil-sliders-v"></i><Link to='./panelBoard'>Controll Panel</Link></span>
                                    </li>
                                }
                                {(user?.email === findMember?.email && findMember?.isSignOut === false && findMember?.approval === true && findMember?.isAdmin === false && user?.emailVerified === true) &&

                                    <li>
                                        <span className={`${darkmode && 'hover:text-orange-500'} `} ><i class="uil uil-setting"></i><Link to='./dashboard'>Dashboard</Link></span>
                                    </li>
                                }
                                <li>
                                    <span><i class="uil uil-signin"></i><Link className={`${darkmode && 'hover:text-orange-500'} `} to='./login'>Login</Link></span>
                                </li>
                                {
                                    (user?.email && user?.emailVerified === true) &&
                                    <li>
                                        <span><i class="uil uil-signin"></i><Link className={`${darkmode && 'hover:text-orange-500'} `} to='./memberLogin'>Member Login</Link></span>
                                    </li>
                                }

                                <li>
                                    <span
                                        onClick={async () => {
                                            const success = await signOut();
                                            if (success) {
                                                alert('You are sign out');
                                                navigate('/login')
                                            }
                                        }}
                                        className={`${darkmode && 'hover:text-orange-500'} `}><i class="uil uil-signout"></i> <a href='###'>Logout</a></span>
                                </li>
                                <li>
                                    <span className={`${darkmode && 'hover:text-orange-500'} `} onClick={handleDarkMode} ><i class={`uil ${darkmode ? 'uil-brightness-low' : 'uil-moon'}`}></i>{darkmode ? <p>Light mode</p> : <p>Dark mode</p>}</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;