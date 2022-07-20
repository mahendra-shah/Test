import './topbar.css'


export default function Topbar() {
    const topList = [{nLink:'#', nName:'HOME'}, {nLink:'#', nName:'ABOUT'}, {nLink:'#', nName:'CONTACT'}, {nLink:'#', nName:'WRITE'}, {nLink:'#', nName:'LOGOUT'}]

    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fa-brands fa-linkedin"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
                <i className="topIcon fa-brands fa-facebook-square"></i>
            </div>
            <div className="topCenter">
                <ul className='topList'>
                    {
                        topList.map(e => <li className="topListItem"><a href="{e.nLink}">{e.nName}</a></li>)
                    }
                </ul>
            </div>
            <div className="topRight">
                <i className="topSearchIcon fas fa-search"></i>
                <img className='topImg'
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="profile"
                />

            </div>
        </div>
    )
}
