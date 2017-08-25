

_This is a live document, Any ideas on how it can be improved will be highly appreciated_

##Reconstructing governance
In recent years a new paradigm around decentralization has emerged.
technologies such as [Ethereum](https://www.ethereum.org/), [IPFS](https://ipfs.io/) or [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) offer a new set of possibilities for re-designing most of the systems that drive our society.

_Governance_ has been echoing within the community for long time. And for good reason. ** The abscence of a central authority seems to imply no-governance. Whatever this is true or not governance issues have been all over the place.

As part of the [Uumm](https://xavivives.github.io/Uumm/#intro) project I wanted to distill _governance_, to later put it together in some sort of tool. It was personal exercice to better understand how the future of governance may look like.

It soon become aparent that _governance_ is a very broad concept and very loosley used. What I really was trying to understand was [Adhocracy](https://en.m.wikipedia.org/wiki/Adhocracy).

This document is an attempt to imagine and lay down the fundamental pieces on how future organization could be govern within this new paradigm.

# Meritocracy as a base.
All governance systems are a supset of [Meritocracy](https://en.wikipedia.org/wiki/Meritocracy), if you understand _merit_ as the feature that defines the right of an entitity opinion to be considered (vote).

_For ease of use and simplification I concentrated all the examples in a single section down below. You may jump there if something doesn't make total sense._

_And for the same resaons I narrowed down the relevant merit properties to the following._

### Ideal properties of merit

 1. Defines what's of value to the system in order to make decisions.
 2. Can't be a medium of exchange
 3. Needs to be quantifiable

## 1. Merit defines value

For the system to work, the defininiton of merit needs to be aligned with the system goals. It should tell what is of value to the system in order to make decisions. In this sense, merit is used as a filter, only the entities with certain capacities can take decisions.

If defined broadly or incorrectly the system is likely to have [unintended consequences](http://lesswrong.com/lw/y3/value_is_fragile/) or be gammed.

## 2. Merit is not a currency
It is not a medium of exchange.

If you can trade the merit you end up with a system ruled by the entities that have more economic power. Any incentive intrinsic to the merit is gone, and the only remaining incentive is to benefit the new owner.

`Fun game: How many ICO tokens are used for governance?`

It does makes sense, of course, to reward the entities based on its merit. Or ideally based on a decision proven to be correct. But this is not the same thing.

## 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate, we need merit in a quantifiable format.

_If the system is trustful (as opose to trustless), this property is not required, as is likely that the participants use reputation as merit. But for a system to scale this is unlikely to be the case._

This should be some sort of none-exchangable token, but not necessarly, for example in the case of Bitcoin this is how many times a miner has been the first to find the block hash within a short period of time.

In the case of nation state elections, this your ID card.

In the first iteration of Uumm this is the amount of contributions done by an entitity.

### System failure

Most systems end up compromizing its own interest (#1) in order to make the system usable (#3). And so many others have an direct or indirect way to exchange merit (#2) and therefore compromizing its integrity.

Defining merit is hard because it is a complex data type, and can't be easily reduced to a single number.

The reason merit is complex is because systems are complex. Making systems simpler may be of great help (this is what the second part of this post is about), but it is not enough.



### We can do better
So, how can we make less compromized governance systems?

We could use the past as an indicator of future events. Which is something quite instinctive for human beings.

### Prediction markets
For not very complex systems, where data is mesurable, something like Futarchy is very close to ideal. 

The merit of a participant is the capacity to predict events correctly. And it is rewarded if so.

### Reputation systems
Reputation systems have a very close correlation to merit. You could define reputation as a proven capcity of an entity.

There are thousands of reputation systems already in use (any 5 stars raiting, credentials, comments, followers, likes...), the problem is that they usually live in mutable (therefore can be altered) permissioned (therefore unaccessible) databases. And because they're owned by entities that monetize on them, they have no incentive to change.

The new paradigmn is different. Communities/platforms/daos that live on decentralized networks do not survive by keeping all this data, its quite the oposite. They enhance each other when the data is accesible.


over Ethereum is the most ideal tool I'm aware of to build such systems. 



Repoutation sytems are usually build on top of identities

### Examples

**Nation state**
Ideal merit doesn't exist because interst are different.


## Reputation agreagators

### What do we need?
An standard interface for reading reputation

### Clear and simple goal
It is required for merit to be defined accurately

# Interoperable Adhocracy

### Identity agnostic
If the goal is to make the best decision possible, it should not matter where the ideas com from. Anyone/thing should be a potential participant, whatever it's a kid, an AI, a prediction market, another governance entity.

### Nestable
That means a governance system should be able to act as a participant entity to another governance system.

Governance models tend to complexity. By nesting a governance inside another the incentives towards simple clear goals are kept, while adding sofistication to the system as a whole.



###Friction less
###Voluntary
###Simple
###Enforcable or turstable



##What can we build
In Bitcoin, to change the protocol (vote), the miner needs to secure the network (merit)

In a small business the right to make decisions (vote) belongs to the owner (merit)

In a nation state to vote on elections (vote) you need to be a citizen  (merit)


One of the things that facinated me about Bitcoin was the fact that something as complex as a currency could work without an authority, or laws, Not imposed, completley voluntary.


For the first iteration I went for a hands on approach on how to implement a very specific usecase I was dealing with few months ago. I called 'contribution-based governance', where...

**Contribution = Voting rights = Earnings**


any small companies have adopted the lean start-up model, which emphasizes early prototyping and pivoting rapidly to new business models as circumstances change.8 In all these settings, informed, decisive action matters more than formal authority or knowledge.