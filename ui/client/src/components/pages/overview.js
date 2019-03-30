import React, { Component } from "react";
import Navbar from "../navbar";
import "../components.css"



class Overview extends Component {
    render() {
        return (
            <div>
                <Navbar />
                    <div className="card, offset-3">
                    <div className="card-body">
                        <h5 className="card-title">Welcome to OpenLease</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Free, secure, forever-available execution and registry of residential leases</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>

            </div>

        );
    }
}

export default Overview;