# Uumm
_The Ultimate Unicorn Maker Machine_

[Latest live version](https://xavivives.github.io/Uumm/)

This document is old. The ideas behind it have been polished and are reflected on [this document](https://github.com/xavivives/Uumm/blob/master/support/Broken%20meritocracy.md). For the time being this readme still here to reflect the original intentions of the project.

# What's this project about?
It's a decentralized governance tool for collaborative projects based on the assumption that the percentage of user ownership of a project is equal to the percentage of user contribution to the project.

The percentage of ownership translates into the percentage of voting rights as well as the percentage of received income in case the project receives funds.

**`Contributed percentage` = `Voting rights percentage` = `Recieved funds percentage`**

### Value tokens
The system uses `value tokens`. The value of a single token is agreed among the participants, so the system is agnostic to what they represent. Most likely a value reference is necessary for the participants to agree upon.

For example one `value token` could represent one hour of work.

Another approach could be, one token is the amount of effort to do X task. So, two tokens would be something that would require double the effort.

The `total supply` of tokens is 1 when a project is created (belonging to the project creator). Every time a contribution request is approved, the `total supply` increases by the same amount of awarded tokens for the contribution, therefore diluting everyone else's stake.

Accordingly, each user `contributed percentage` is based on the `total supply`:

`contributed percentage = total supply / user owned tokens`

### Workflow
When a contribution has been made, the participant will call the Ethereum contract requesting the desired amount of value tokens.

The current stakeholders of the project will vote, and if a positive consensus is reached, the tokens will be awarded.

At this point, the participant has increased her amount of tokens and her stake accordingly.

This is what a simplified workflow will look like with its equivalent contract functions (pseudocode):

![Flow overview](http://i.imgur.com/UMVgxGY.png)

# Approach
This project aims to create a governance tool following a bottom-up, organic, lean approach.

_As oppose to, here is a .pdf with a bunch of idealistic ideas, especualte with my promises even if you don't give a crap and the only thing you want is easy money, now I'm rich and I don't have any incentives to keep working on this anymore._

I'm starting with an MVP for a usecase I've been exposed to, and if it makes sense I'll keep expanding with more features. 


Everyone is welcome to join.

# Status
The current goal is to have an MVP running with no fancy features.
Once the MVP is done and tested we will re-think the direction of the project.

- [x] Initial design and sketches
- [x] Repo and readme setup 
- [x] Basic contract functionallity 
- [x] [Contract](https://github.com/xavivives/Uumm/blob/master/contracts/Uumm.sol)
- [x] User interface design
- [x] Minimal user interface implementation 
- [x] [Public Ropsten deployment](https://xavivives.github.io/Uumm/)
- [x] Code optimizations
- [x] Beautification
- [ ] Unit tests **(WIP)**
- [ ] Testing and polishing **(WIP)**
- [ ] Deploy to mainnet
- [ ] Re-think. Re-design.

# Tech stack
The project runs on top of the Ethereum network.
~~Embark~~ [Truffle](http://truffleframework.com/) is used as a framework for Ethereum.
Javascript with ReactJS and Material-UI for the user interface

[This contract](https://github.com/xavivives/DCBG/blob/master/app/contracts/DCBG1.sol) (WIP) is the core of the project. Any review is highly appreciated.

This stack is what I'm currently familiar with, and I'm using ~~a previous project~~ [Truffle's Status box](http://truffleframework.com/boxes/) as a template to speed up development.

# Personal motivations 

### Origins
The idea was developed when we were working on [Taster](http://random-happiness.com/taster) and we were trying to find a fair and transparent way to distribute the potential earnings of the project.

The system was never put in practice, but a good amount thinking went into it.

Just recently I've been digging deep into Ethereum, and that seemed a perfect fit and a great excuse to explore and understand the platform better.

### Generalization
It is common for collaborative or open projects to start being some sort of [adhocracy](https://en.m.wikipedia.org/wiki/Adhocracy), with aan abstract idea, grow organically to finally shape into more serious/structured stuff.

Common features at the begining of these projects are:
- No tools for tracking progress
- Lack of authority for ultimate decision making.
- Increase and decrease of the number of participants.
- No clear monetization strategy or total lack of it.
- Interdisciplinary  (Not only software development, harder to track collaborations).

This translates to:
- No record of contributions, therefore no reputation systems, no incentives to keep participating.
- When governance is implemented in the project, earlier contributions are dismissed or not valued 
- Incapacity to distribute monetary gains fairly (Let's say an open source project receives a donation).

By having a system to record that in a decentralized fashion, I'm trying to solve some of these issues, or at least understand them deeply.

### Future projects
Another important motivation for me is to use the system for future projects of mine and incentivise early participation.

# Brainstorming
_When an idea seems a little cohesive I dump it here. Have more? Let me know!_

### Proposal types
- **Contribution done:** The only type of proposal for the current MVP. The contributor asks for token after contribution. _"I've done X, I believe I should receive Y tokens for it"_
- **Contribution promise:** The preferable type since the participants agreed on the conditions before any effort is made. _"I will do X for Y tokens before deadline"._
- **Change the rules**: Change main properties of the project: Concensus threshold, minimum participation, project name, description, logo...
- **Polling:** No tokens will be awarded. Multiple options could be available as opose to the binary options from other proposal types.  _"What feature should we implement first : X, Y or Z?"_ (This should not be a priority since it can be achived using alternative communication channels.);

On top of awarding `value tokens`, ether could be awarded as well.

### Nesting
Meaning that project `A` could be a contributor of project `B`. This will allow for more complex organizations.
Proposals on project `B` will have to cascade down to project `A`.

### Spin-off projects
Project `B` (spin-off project) is a sub-project of `A`, it does not add value to `A` but its own value is based on the project `A` contributions. It's pretty much like a fork, so at the time of the spin-off creation, it's identical to its base project.

For example, project `A` has created a photo-booth for parties, they've worked on that for 3 months. Now they want to make money by renting it for events. A spin-off project from `A` will be created (project `B`).
Renting the booth requires having a manager and a tech guy to take care of it. By spending all day taking care of the booth they will add value to project `B` (not `A`, since it won't make  `A` better). When they get paid for the renting at the end of the weekend, the funds will be distributed based on project `B` shares distribution, wich is based on project `A`. Therefore, the manager, the tech guy, and all the contributors from `A` will get paid.

[Polyps](http://bcs.whfreeman.com/webpub/Ektron/Hillis%20Principles%20of%20Life2e/Animated%20Tutorials/pol2e_at_2301_Life_Cycle_of_a_Cnidarian/pol2e_at_2301_Life_Cycle_of_a_Cnidarian.html) are a nice biologic-like parallelism. Via [Greg Albittron](https://twitter.com/albrittongreg/status/885211686222925825) 

### Contributors without voting rights
These contributors are still credited with their effort, and still get paid if the project gets funded, but wont be able to vote on proposals. These makes sense only under certain circumstances.
- A contributor doesn't want to participate on the governance anymore.
- A project wants to automatically reward certain endevours. _"We want that an X amount of our earnings go to Wikileaks"._
- An spin-off project that wants to be independent, but wants to credit the creators of their base project. (Not sure about that one)


### Whitelisting and transaction fees
In public projects, in order to avoid spam attacks, new contributors may have to ask to be _whitelisted_ using alternative channels.
Maybe _blacklisting_ makes sense as well in order to ban existing malicious contributors.

Another way to prevent spam would be to charge a fee for certain proposals, the fee could be returned if the proposal is accepted.

### Proxy voting, and ERC20 tokens
Not sure if those make sense. This will allow a marketplace of shares. Looking for opinions.

### Token name
`Value token` although it's representative it's too long and too generic.

A symbol for representing is likely to be needed as well.
[Greek alphabet](https://en.wikipedia.org/wiki/Greek_alphabet) is a good source of inspiration.
Would be nice that on top of being a good looking character and had some meaning.

### Privacy
I have no solid opinion on how private data should be in this kind of project. Ideas are welcomed. Current apporach assumes no privacy.

## Other stuff

#### Project name 
**D**ecentralized **C**ontribution **B**ased **G**overnance was its original name. It was kind of super shitty and after few days I was unable to keep coding and seeing _DCBG_ everywhere...

So, I seat down with my brain threads and we reached concensus: **U**ltimate **U**nicorn **M**aker **M**achine.
A tool for creating fantastic entities!

## Spam me!
- Got ideas?
- Use cases that could be handled?
- References we should look up?
- Would you like to try it? (We will need some beta-testers soon)
- Want to contribute?

Ping me on Twitter [@xavivives](https://twitter.com/xavivives)  or email me at xavings@gmail.com

##### ALOHA
