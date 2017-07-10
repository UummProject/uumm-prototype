_Got a better name for this project?_

# What's this project about?
It's a decentralized governance tool for collaborative projects based on the assumption that the percentage of user ownership of a project is equal to the percentage of user contribution to the project.

The percentage of ownership translates into the percentage of voting rights as well as the percentage of received income in case the project receives funds.

**`Contributed percentage` = `Voting rights percentage` = `Recieved funds percentage`**

### Value tokens
The system uses `value tokens`. The value of a single token is agreed among the participants, so the system is agnostic to what they represent. Most likely a value reference is necessary for the participants to agree upon.

For example one `value token` could represent one hour of work.

Another approach could be, one token is the amount of effort to do X task. So, two tokens would be something that would require double the effort.

The `Total supply` of tokens is 1 when a project is created (belonging to the project creator). Every time a contribution request is approved, the `Total supply` increases by the same amount of awarded tokens for the contribution, therefore diluting everyone else's stake.

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

This stack is what I'm currently familiar with, and I'm using a previous project as a template to speed up development. Thinking on a full refactor if MVP is successful.

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

### Future projects
Another important motivation for me is to use the system for future projects of mine and incentivise early participation.

# Brainstorming

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
Project `B` (spin-off project) is a sub-project of `A`, 'it' does not add value to `A` but its own value is based on the project `A` contributions. It's pretty much like a fork, so at the time of the spin-off creation, it's identical to its base project.

For example, project `A` has created a photo-buzz for parties, they've worked on that for 3 months. Now they want to make money by renting it for events. A spin-off project from `A` will be created (project `B`).
Renting the buzz requires having a manager and a tech guy to take care of it. By spending all day taking care of the buzz they will add value to project 'B' (not `A`, since it won't make  `A` better). When they get paid for the renting at the end of the weekend, the funds will be distributed based on project `B` shares distribution, wich is based on project `A`. Therefore, the manager, the tech guy, and all the contributors from `A` will get paid.

### Contributors without voting rights
These contributors are still credited with their effort, and still get paid if the project gets funded, but wont be able to vote on proposals. These makes sense only under certain circumstances.
- A contributor doesn't want to participate on the governance anymore.
- A project wants to automatically reward certain endevours. "We want that an X amount of our earnings go to Wikileaks".
- An spin-off project that wants to be independent, but wants to credit the creators of it's base project. (Not sure about that one)


### Whitelisting and transaction fees
In public projects, in order to avoid spam attacks, new contributors may have to ask to be _whitelisted_ using alternative channels.
Maybe _blacklisting_ makes sense as well in order to ban existing malicious contributors.
Another way to prevent spam would be to charge a fee for certain proposals, the fee could be returned if the proposal is accepted.

### Proxy voting, and ERC20 tokens
Not sure if those make sense. This will allow a marketplace of shares. Looking for opinions.

## Spam me!
Got ideas?
A better name for the system?
Use cases that could be handled?
References I should look up?
Would you like to try it? (We'll love some beta-testers)
Want to help?

Ping me on Twitter [@xavivives](https://twitter.com/xavivives)  or email me at xavings@gmail.com

##### ALOHA