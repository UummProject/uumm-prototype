# Broken meritocracy

_This is a live document, any feedback to improved it will be highly appreciated._

### Context
In recent years a new paradigm around decentralization has emerged.
technologies such as [Ethereum](https://www.ethereum.org/), [IPFS](https://ipfs.io/) or [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) offer a new set of possibilities for re-designing most of the systems that drive our society.

_Governance_ has been echoing within the community for long time. And for good reason. The abscence of a central authority seems to imply no-governance. Whatever this is true or not governance, issues have been all over the place.

### Motivations
As part of the [Uumm](https://xavivives.github.io/Uumm/#intro) project I wanted to distill _governance_, to later put it together in some sort of tool with full consideration of this new paradigm. It was personal exercice to better understand how the future of governance may look like.

This document is an attempt to imagine and lay down the fundamental pieces on how future organizations build ont top of this new paradigmn may look like.


# Meritocracy as a base
All governance systems are a supset of [Meritocracy](https://en.wikipedia.org/wiki/Meritocracy), if you understand _merit_ as the feature that defines the right of an entity opinion to be considered (vote).

_For ease of use and simplification I concentrated all the examples in a single section down below. You may jump there if something doesn't make total sense._

_And for the same resaons I narrowed down the relevant merit properties to the following._

## The ideal merit

 1. Defines what's of value to the system in order to make decisions.
 2. Can't be a medium of exchange
 3. Needs to be quantifiable

### 1. Merit defines value

For the system to work, the defininiton of merit needs to be aligned with the system goals. It should tell what is of value to the system in order to make decisions. In this sense, merit is used as a filter, only the entities with certain capacities can take decisions.

If defined broadly or incorrectly the system is likely to have [unintended consequences](http://lesswrong.com/lw/y3/value_is_fragile/) or be gammed.

### 2. Merit is not a currency
It is not a medium of exchange.

If you can trade the merit you end up with a system ruled by the entities that have more economic power and any required capcity intrinsic to the merit is gone.

In consequence you end up with a system where the goal is to maximize profit and the entities that rule it don't have the necessary capacities to do so (other than having economy power).

`Fun game: How many ICOs use ERC20 tokens for governance?`

### 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate in a system that can scale, we need merit in a quantifiable format.

This should be some sort of none-exchangable token, but not necessarly, for example in the case of Bitcoin this is how many times a miner has been the first to find the block hash within a defined amount of blocks.

In the case of nation state elections, this your ID card.

In the first iteration of Uumm this is the amount of contributions done by an entitity.

## System failure

Most (I really mean 'most') systems end up compromizing its own interest (#1) in order to make the system usable (#3). And so many others have an direct or indirect way to exchange merit (#2) and therefore compromizing its integrity.

### Tokenetization problem
How do you abstract all the necessary capacities to make an specialized decision and put them into a single number?

I don't know.

Instead what we can do is to quantify proven capacities, and use it as merit. AKA Reputation.

# Reputation

Within this context, merit defines a required capacity of an entity, while reputation is a proven record of a capacity.

This makes reputation systems extremely suitable for governance.

### Centralized
There are thousands of reputation systems already in use (5 stars raiting, credentials, comments, followers, likes...), the problem is that they usually live in mutable (therefore can be altered) permissioned (therefore unaccessible) databases. And because they're owned by entities that monetize on them, they have no incentive to change.

Tim Pastoor on [Fixing Orwellian Reputation Systems](https://medium.com/@2W/fixing-orwellian-reputation-systems-4d01d489dcb7)

### Decentralized
The new paradigmn is different. Communities/platforms/DAOs that live on decentralized networks do not survive by keeping all this data, its quite the oposite. They enhance each other when the data is accesible. It shoul

###Problems

###ID
In order to create decentralized reputation we need decentralized identities. Luckily several endeveours are on the works ([DID](https://w3c-ccg.github.io/did-spec/), [UPort](https://www.uport.me/), [Blockstack](https://blockstack.org/), [Keybase](https://keybase.io), [identifi](https://github.com/identifi/))

### Standaritzation
The next problem is that there is no standaritzation. The data may be public and inmutable, but it may not be accessible enough.

- [A Media Type for Reputation Interchange] (https://tools.ietf.org/html/rfc7071) by [IETF](https://www.ietf.org/) (2013).
- [Decentralized Cooperation needs Decentralized Reputation](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust/blob/master/topics-and-advance-readings/DecentralizedCooperationNeedsDecentralizedReputation.md) by [Noah Thorp](https://twitter.com/noahthorp) (2015).

### Subjective reputation??? [WIP]
The previous assumes reputation systems to be objective. Meaning that at least the participants need to have concensus over the state of a reputation metric.


### Processed reputation
Even with available reputation sytems we still need to deal with the complexity problem. 
Is up to each system to decide how to compute merit. But is likely that it will use several reputation metrics to do so.
The more data liquidity the system has, the more accurate the merit can be.

As far as I can imagine, a system that can access and compute the necessary reputation metrics in order to build its own 'ideal' merit token, is the closest we can be to a goverance truth to its goals.


## Aditional notes
To keep things simple I left some things out of the current document.
I'll love to keep extending it. Feedback is welcome as always.

### Prediction markets
There has been a lot of talk about the role that prediction markets could have on governance.

When the results of the decisions can be easly mesured and the pool of participants is high [futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/) seems a very intersting approach, but it makes it only duable on a very narrow scope.


These systems are specially intersting because they add an strong incentive layer.




### Proxy voting
[Proxy voting](https://en.wikipedia.org/wiki/Proxy_voting) or [Liquid democracy](https://en.wikipedia.org/wiki/Delegative_democracy) are commonly suggested improvements that the new paradigmn makes easy to implement.

The way I see it, it makes merit exchangable, therefore breaking property #2.


### Questions
- Are there any wrong assumption on this document?
- Are there better alternatives to reputation?
- Could subjective reputation be used on decentralized governance? How?
- Will it make sense for the descrived meritocracy to strongly reward any participation (voting), whatever the decision is correct or not?


## Examples

_The numbers (1,2,3) make reference to the previously described merit properties_


### Nation state elections
**Decisions to make:** Choose the representatives
**Participants:** Legal citizens

**Theory:**

1. The required merit is to be a citizen.
2. Merit is binded to your identity, therefore can't be exchanged
3. Merit is tokenized by using ID cards. Each ID card is one vote.

**Reality (undersired consequences):**

1. All the participants (whatever they have the right capacities to make good decisions or not), have the same decision power. There is no required skill to vote.
2. While the ID card can't be exchange, the opinion of the participants can be esyly manipulated by media (specially because they don't have the capcities to understand the problems (#1)) which is manipulated by lobbist, which are the entities with more economic power. 
3. Id cards tokenize merit but not without compromizing the other properties.



### Bitcoin
**Decisions to make:** Change the protocol rules
**Participants:** Miners

**Theory:**

1. The required merit is a proof that it recently secured the network by validating transactions 
2. POW can't be exchanged. It is also directly attached to the coinbase reward, making not logical to exchange.
3. How many times a miner has been the first to find the block hash within a defined amount of blocks.

**Reality (undersired consequences):**

1. Miners don't want nework upgrades that don't maximize their profit. A brutal amount of electricity is used.
2. All good here
3. All good here.

### A company department
**Decisions to make:** What features of a product should we focus, who to hire, how much to pay?
**Participants:** Head of the department

**Theory:**

1. Someone with expertise on the subject, with fidelity to the company.
2. The merit is being himself, can't be excahnged, can be influenced.
3. Role defined in its contract (consequence of the time working for the company, resume...)


**Reality (undersired consequences):**

1. Miners don't want nework upgrades that don't maximize their profit. A brutal amount of electricity is used.
2. All good here
3. All good here.