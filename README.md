# openLease
A mobile-focused platform, written in Scala, to leverage the capabilities of OpenLaw's smart contracts and offer the ability to execute a real estate lease on the blockchain.

SUMMARY:
A mobile-focused web app designed to allow individuals with minimal to no technical expertise to execute binding lease contracts via the OpenLaw project operating on the Ethereum blockchain in fiat (non-crypto) currency.

RATIONALE:
There are currently tools being developed on the Ethereum blockchain network that enable individuals to enter into binding legal agreements wherein the agreements themselves have programmatic functions; that is to say, the contract itself is capable of executing payments, with no additional effort needed by the parties. These contracts have additional advantages, namely of being impossible to lose or misplace -- they will always be available on the blockchain -- and of being executable anywhere. One no longer need meet in person, in front of a notary, etc., to physically sign a lease.

These advantages become even more meaningful when one considers the needs of a large portion of the population (at least in the United States) who would be taking advantage of this service: those who live in rented homes. Many renters are economically disadvantaged, and often can be ignorant, for a variety of reasons, of their rights and responsibilities as a tenant. This framework would ideally allow them to have more agency over their contractual agreement: to set the terms for it, and not be as burdened by the process itself, with the assurance that their lease will always be available to them in the event of litigation arising from it. Often someone who is renting does not have reliable access to the internet except on their phone, which is why a mobile-focused approach is so important.

HOW TO MAKE IT WORK:

**Please note -- currently in development**

Given that the backend runs on Scala, I have been developing this with SBT and a Java SDK installed, as well as your standard node.js. Given that there is a React app involved, it may require an 'npm install' in both the root director as well as in /ui. But in terms of actually running it:

In root directory:
'sbt run'

That should spin up the server and React; currently it's hosting at internet default of localhost: 80.
