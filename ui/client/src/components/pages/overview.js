import React, { Component } from "react";
import Navbar from "../navbar";
import "../components.css"



class Overview extends Component {
    render() {
        return (
            <div>
                <Navbar />
                    <div className="card offset-5">
                    <div className="card-body">
                        <h5 className="card-title">Welcome to OpenLease</h5>
                        <h6 className="card-subtitle mb-2 text-muted">A free platform for landlords and tenants to register legally-binding leases</h6>
                        <p className="card-text">OpenLease leverages the infrastructure built by OpenLaw to resolve an all-too-common problem: 
                        tenants and landlords not having an actual lease in place when entering into a rental agreement. If there's ever a dispute, 
                        the argument is that much more likely to end up in court because there is no record of a meeting of the minds. And if it does end 
                        up in court, the lack of a lease document makes it very difficult to say what had been agreed to, and what the parties are 
                        responsible for.</p>
                        <p>Thus, OpenLease allows landlords and tenants to use, free of charge, a boilerplate lease, which can always be tailored via OpenLaw's 
                            protocols, to memorialize their agreement. The parties fill in their information on our site, then receive an email from OpenLaw
                             which coordinates the electronic signing of the agreement. Once the agreement is signed, OpenLaw records the lease on the Ethereum 
                             blockchain, and users can always log in using the email they used when creating the lease to see previous leases and download .pdf 
                             versions of them.
                        </p>
                        <a href="/new" className="card-link">Get Started</a>
                        <br></br>
                        <a href="/login" className="card-link">See your previous leases</a>
                    </div>
                </div>

            </div>

        );
    }
}

export default Overview;