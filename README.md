# openLease
A mobile-focused platform, written in Scala, to leverage the capabilities of OpenLaw's smart contracts and offer the ability to execute a real estate lease on the blockchain.

SUMMARY:
A mobile-focused web app designed to allow individuals with minimal to no technical expertise to execute binding lease contracts via the OpenLaw project operating on the Ethereum blockchain. 

Huge shout out to https://github.com/yohangz/scala-play-react-seed for providing the basic backend.

RATIONALE:
There are currently tools being developed on the Ethereum blockchain network that enable individuals to enter into binding legal agreements wherein the agreements themselves have programmatic functions; that is to say, the contract itself is capable of executing payments, with no additional effort needed by the parties. These contracts have additional advantages, namely of being impossible to lose or misplace -- they will always be available on the blockchain -- and of being executable anywhere. One no longer need meet in person, in front of a notary, etc., to physically sign a lease.

These advantages become even more meaningful when one considers the needs of a large portion of the population (at least in the United States) who would be taking advantage of this service: those who live in rented homes. Many renters are economically disadvantaged, and often can be ignorant, for a variety of reasons, of their rights and responsibilities as a tenant. This framework would ideally allow them to have more agency over their contractual agreement: to set the terms for it, and not be as burdened by the process itself, with the assurance that their lease will always be available to them in the event of litigation arising from it. Often someone who is renting does not have reliable access to the internet except on their phone, which is why a mobile-focused approach is so important.

FUTURE GOALS:
-Include contractual calls to enable automated payments, both via crypto and via fiat currencies
-Employ OpenLaw's upcoming 'clause' functionality to allow leases to be built in a modular fashion, clause-by-clause

HOW TO MAKE IT WORK:

**Please note -- currently in development**

The following need to be installed:

-Java (JRE and JDK)
-Node.js
-sbt

The software has been developed in a Windows environment and is being deployed in Linux. If you're trying to set it up on a remote server, these links will be helpful in order:

-generate keys and add them to git:
https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
-become owner of directory:
https://stackoverflow.com/questions/20276895/could-not-create-work-tree-dir-example-com-permission-denied
-git clone the repo:
git clone git@github.com:mapachurro/OpenLease.git
-install nodejs
https://github.com/nodesource/distributions/blob/master/README.md
-install java, JRE and JDK as per the following:
https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04
-install sbt as per:
https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Linux.html
-run 'npm install' in ./ui

RUN SCRIPT:
In root directory, run 'sbt stage' and check for any errors that need to be fixed. Then run 'sbt run'.
