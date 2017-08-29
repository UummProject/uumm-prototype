# From broken meritocracy to interoperable adhocracy

_This is a live document, any feedback to improved it will be highly appreciated._

### Context and motivations
In recent years a new paradigm around decentralization has emerged.
technologies such as [Ethereum](https://www.ethereum.org/), [IPFS](https://ipfs.io/) or [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) offer a new set of possibilities for re-designing most of the systems that drive our society.

_Governance_ has been echoing within the community for long time. And for good reason. The abscence of a central authority seems to imply no-governance. Whatever this is true or not governance, issues have been all over the place.

As part of the [Uumm](https://xavivives.github.io/Uumm/#intro) project I wanted to distill _governance_, to later put it together in some sort of tool with full consideration of this new paradigm. It was personal exercice to better understand how the future of governance may look like.

This document is an attempt to imagine and lay down the fundamental pieces on how future organization could be govern within this new paradigm.

It became aparent that in order to make any significant advancement in governance systems, a solid standaritzation of reputation metrics is a must.

# Meritocracy as a base
All governance systems are a supset of [Meritocracy](https://en.wikipedia.org/wiki/Meritocracy), if you understand _merit_ as the feature that defines the right of an entitity opinion to be considered (vote).

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
Therefore you end up with a system where the goal is to maximize profit but the entities that rule it don't have thne necessary capacities other than having economic power.

`Fun game: How many ICO tokens are used for governance?`

It does makes sense, of course, to reward the entities based on its merit. Or ideally based on a decision proven to be correct. But this is not the same thing.

### 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate, we need merit in a quantifiable format.

_If the system is trustful (as opose to trustless), this property is not required, as is likely that the participants use reputation as merit. But for a system to scale this is unlikely to be the case._

This should be some sort of none-exchangable token, but not necessarly, for example in the case of Bitcoin this is how many times a miner has been the first to find the block hash within a defined amount of blocks.

In the case of nation state elections, this your ID card.

In the first iteration of Uumm this is the amount of contributions done by an entitity.

## System failure

Most (I really mean 'most') systems end up compromizing its own interest (#1) in order to make the system usable (#3). And so many others have an direct or indirect way to exchange merit (#2) and therefore compromizing its integrity.

Defining merit is hard because it is a complex, and can't be easily reduced to a single number.

The reason merit is complex is because systems are complex. Making systems simpler may be of great help (this is what the second part of this post is about), but it is not enough.

We need metrics that can contain complex information.

## Reputation
For complex decisions. Tokens for simple decisons?

Within this context, merit defines a required capacity of an entity, while reputation is a proven record of a capacity.

This makes reputation systems extremely suitable for governance.

### In the past
There are thousands of reputation systems already in use (5 stars raiting, credentials, comments, followers, likes...), the problem is that they usually live in mutable (therefore can be altered) permissioned (therefore unaccessible) databases. And because they're owned by entities that monetize on them, they have no incentive to change.

### The new one 
The new paradigmn is different. Communities/platforms/daos that live on decentralized networks do not survive by keeping all this data, its quite the oposite. They enhance each other when the data is accesible.

The problem is that there is no standaritzation. The data is there, but is not accessible in the first place.



### Processed reputation
Even with reputation sytems we still need to deal with the complexity problem. 
Is up to each system to decide how to compute merit. But is likely that it will use several reputation metrics to do so.
As far as I can imagine, a system that can access and compute the necessary reputation metrics in order to build its own merit token, is the closest we can be to a true goverance.

## Incentives

## Aditional notes
To keep things simple I left some things out of the current document.
I'll love to keep extending it. You're welcome to open a issue on Github.

### Prediction markets
There has been a lot of talk about the role that prediction markets could have on governance.

They are specially intersting because they add an strong incentive layer.

When the results of the decisions can be easly mesured and the amount of participants is high futarchy seems a very intersting approach, but it makes it only duable on a very narrow scope.

It does seem an idea with a lot of potential and with very interesting usecases.

### Liquid democracy
Proxy voting is another common suggested improvement that the new paradigmn makes easy to implement.

It makes merit exchangable, therefore breaking property #2.



### Questions
- Is there any wrong assumption on this document?
- Is there better alternatives to reputation?

## Examples

_The numbers (1,2,3) make reference to the previously described properties_


### Nation state
Theory:

1. The required merit is to be a citizen.
2. Merit is binded to your identity, therefore can't be exchanged
3. Merit is tokenized by using ID cards. Each ID card is one vote.

Reality:

1. All the participants (whatever they have the right capacities to make good decisions or not), have the same decision power. There is no required skill to vote.
2. While the ID card can't be exchange, the opinion of the participants can be esyly manipulated by media which is manipulated by lobbist, which are the entities with more economic power. This could be minimized if the #1 property was in place.
3. Id cards tokenize merit but not without compromizing the other properties.
 

### What do we need?
An standard interface for reading reputation

### Clear and simple goal
It is required for merit to be defined accurately



# Interoperable Adhocracy

Before we attempted to describe the ideal features that single governance should have.

What if any governance system could interact with any other governance? How this ecosystem should look like. What would it enable.

### Why adhocracy?
_Governance_ is a broad concept very loosely used. The new decentralized paradigmn has a set of properties that are much better captured by adhocracy.

>[Adhocracy](https://en.wikipedia.org/wiki/Adhocracy#Types_of_adhocracy) is characterized by an adaptive, creative and flexible integrative behavior based on **non-permanence**  and **spontaneity**. - Wikipedia


## Voluntary

If you go over adhocracy [characteristics](https://en.wikipedia.org/wiki/Adhocracy#Characteristics_of_adhocracy) you will realize that many of those are just the result of participation being voluntary, therefore the _non-permanence_ feature.

### Darwinian selection
Voluntary participation on a governance system serves as [natural selection](https://en.wikipedia.org/wiki/Universal_Darwinism) tool.

The reason this is important is because it becomes another governance process at the most fundamental level. It tells if a project should exist or not.

Decentralized projects are intrinsically open-source, therfore they also can adapt or transofrm by being forked.


## Identity agnostic

If the goal is to make the best decision possible, it should not matter where the ideas com from. Anyone/anything should be a potential participant, whatever it's a kid, an AI, a prediction market or another governance entity.

Is the merit's job to filter who can participate.

### Zero knowledge proof reputation
There is a little paradox here. We need decentralized identities in order to build decentralized reputation systems.
We also want the governance tools to be identity agnostic. While I don't see this as showstopper, [Zero knoledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) reputation seems be a nice to have



Crypto-currencies almost come with this property built-in. The main problem here is accounts can be exchanged. [a](Reference required)



## Nestable governance
That means that a governance system should be able to act as a participant entity to another governance system.

### Keep it simple
Governance models tend to complexity. By nesting a governance inside another the goals of a single governance entity can be keep simpler and therefore making the required merits simpler as well.

### But complex
This would allow the creation of hierachical structures, making the system as a whole complex, while keeping each entity simple.

This is common in most goverances already (departments of a company, states/countys), that's why I was surprized to not find any existing proposal withinthe decentralized paradigm.



## Relevant reads
- [A Media Type for Reputation Interchange] (https://tools.ietf.org/html/rfc7071) by [IETF](https://www.ietf.org/) (2013).
- [Decentralized Cooperation needs Decentralized Reputation](https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust/blob/master/topics-and-advance-readings/DecentralizedCooperationNeedsDecentralizedReputation.md) by [Noah Thorp](https://twitter.com/noahthorp)(2015).
- [An Introduction to Futarchy] (https://blog.ethereum.org/2014/08/21/introduction-futarchy/) by [Vitalik Buterin](https://twitter.com/VitalikButerin) (2014)




###Friction less
###Voluntary
###Simple
###Enforcable or turstable

##What can we build
In Bitcoin, to change the protocol (vote), the miner needs to secure the network (merit)

In a small business the right to make decisions (vote) belongs to the owner (merit)

In a nation state to vote on elections (vote) you need to be a citizen  (merit)

