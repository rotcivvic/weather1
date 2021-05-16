import React from 'react'

export default function Navbar(props) {
    return (
        <div className="col">
            <div className="col-md-6">
             <h1 className="title">Weather</h1>
            </div>
        
            <div className="col-md-6">
                <form className="region float-md-right" onSubmit={(e) => {props.changeWeather(e)}}>
                    <input className="form-control w-100  shadow-sm p-2 regioninput" placeholder="Location"
                    onChange={(e) => props.changeRegion(e.target.value)}/>
                </form>
            </div> 
            
        </div>
    )
}
