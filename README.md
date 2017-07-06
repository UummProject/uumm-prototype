_This is a living document updated daily_

# What's this project about?
It's a decentralized governance tool for collaborative projects based on the assumption that the percentage of user ownership of a project is equal to the percentage of user contribution to the project.

The percentage of ownership translates into the percentage of voting rights as well as the percentage of received income in case the project receives funds.

`Contributed percentage = Voting rights percentage = Recieved funds percentage`

### Value tokens
The system uses `value tokens`. The value of a single token is agreed among the participants, so the system is agnostic to what they represent. Most likely a value reference is necessary for the participants to agree upon.

For example one `value token` could represent one hour of work.

Another approach could be, one token is the amount of effort to do X task. So, two tokens would be something that would require double the effort.

The `Total supply` of tokens is zero when a project is created. Every time a contribution request is approved, the `Total supply` increases by the same amount of awarded tokens for the contribution, therefore diluting everyone else's stake.

Accordingly, each user `Contributed Percentage` is based on the `Total supply`:
`Contributed Percentage = Total supply / User owned tokens`

### Workflow
When a contribution has been made, the participant will call the Ethereum contract requesting the desired amount of value tokens.

The current stakeholders of the project will vote, and if a positive consensus is reached, the tokens will be awarded.

At this point, the participant has increased her amount of tokens and her stake accordingly.

This is what a simplified workflow will look like with its equivalent contract functions (pseudocode):

![Flow overview](http://i.imgur.com/UMVgxGY.png)

# Status
The current goal is to have an MVP running with no fancy features within a couple of weeks (by 20/07/17) Once the MVP is done and tested we will re-think the direction of the project.

- [x] Initial design and sketches
- [x] Repo and readme setup 
- [ ] Contracts design
- [ ] User interface
- [ ] Public Ropsten deployment
- [ ] Testing and polishing

# Tech stack
The project runs on top of the Ethereum network.
Embark as a framework for Ethereum.
Javascript with ReactJS and Material-UI for the user interface.

This stack is what I'm currently familiar with, and I'm using a previous project as template to speed up development. Thinking on a full refactor if MVP is successful.

# Personal motivations 

### Origins
The idea was developed when we were working on [Taster](http://random-happiness.com/taster) and we were trying to find a fair and transparent way to distribute the potential earnings of the project.

The system was never put in practice, but a good amount thinking went into it.

Just recently I've been digging deep into Ethereum, and that seemed a perfect fit and a great excuse to explore and understand the platform better.

### Generalization
It is common for collaborative or open projects to start with an abstract idea and grow organically, shaping into more serious/structured stuff.

Common features of these projects are:
- No tools for tracking progress
- Lack of authority for ultimate decision making.
- Increase and decrease of the number of participants.
- No clear monetization strategy or total lack of it.
- Interdisciplinary  (Not only software development, harder to track collaborations).

This translates to:
- No record of contributions, therefore no reputation systems, no incentives to keep participating.
- When governance is implemented in the project, earlier contributions are dismissed or not valued 
- Incapacity to distribute monetary gains fairly (open source project receives a donation).

With this project, I'm trying to solve some of these issues, or at least understand them deeply.

### Future
Another important motivation is my intention to use the system for future projects of mine and incentivise early participation.

# Brainstorming
- Make it ERC20 token compliant?

Got ideas? References I should look up?
Would you like to try it? (I'm looking for real-world use-cases for testing.)

Ping me on Twitter [@xavivives](https://twitter.com/xavivives)  or email me at xavings@gmail.com


ALOHA