import React, { Suspense } from 'react'
// import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
// import { Sidebar, Content, Header } from '../components/index'
import Content from '../components/Content'
import Navbar from '../components/Navbar'
const DefaultLayout = () => {
    return (
        <div className='landing'>
        <Navbar />
            <div className="wrapper d-flex flex-column min-vh-100">
                {/* <Header /> */}
                {/* <Suspense fallback={<div className="align-self-center"><CSpinner color="primary" /></div>}> */}
                <div style={{ backgroundColor: "lightgray" }} className="body flex-grow-1" >
                    <Content />
                </div>
                {/* </Suspense> */}
            </div>
        </div>
    )
}

export default DefaultLayout