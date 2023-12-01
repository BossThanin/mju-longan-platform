import React from 'react'

function Layout({children}) {
    return (
        <>
            <div className={'container'} style={{overflowY:"scroll" ,padding:'1rem'}}>
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout