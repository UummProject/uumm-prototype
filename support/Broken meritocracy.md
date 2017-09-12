# Broken meritocracy
[Meritocracy](https://en.wikipedia.org/wiki/Meritocracy) is an old concept. It is the idea that decisions should be taken by those better qualified for it. While one will find hard to find reasons why it shouldn't be like this, in the real world this is rarely the case. 

This document explores why most governance systems fail, and it attempts to create a simple framework to easily identify the problems.

Finally, it suggests how decentralized technologies like blockchains and smart contracts could significantly improve the results of the decision making processes.

# Meritocracy as a base
All governance systems are a subset of Meritocracy if you understand _merit_ as the feature that defines the right of an entity opinion to be considered (vote).

_For ease of use and simplification I concentrated all the examples in a single section down below. You may jump there if something doesn't make total sense._

_And for the same reasons I narrowed down the relevant merit properties to the following._

## The ideal merit

 1. Defines what's of value to the system in order to make decisions.
 2. Can't be a medium of exchange
 3. Needs to be quantifiable

### 1. Merit defines value

For the system to work, the definition of merit needs to be aligned with the system goals.

It should tell what is of value to the system in order to make decisions. In this sense, merit is used as a filter, only the entities with certain capacities can participate on the decision making process.

If defined broadly or incorrectly the system is likely to have [unintended consequences](http://lesswrong.com/lw/y3/value_is_fragile/) or be gamed.

I'm using _capacities_ as opose to _skills_ because it can also represent things like _ideology_, _IQ_, _experience_, _dedication_.

### 2. Merit is not a currency
It is not a [medium of exchange](https://en.wikipedia.org/wiki/Currency).

If you can trade the merit you end up with a system ruled by the entities that have more economic power and any required capacity intrinsic to the merit is gone.

In consequence, the goal of the systems is reduced to maximize its profit and the entities that rule it don't have the necessary capacities to do so (other than having economic power).

### 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate in a system that can scale, we need merit in a quantifiable format.

This should be some sort of (no-exchangeable) _capacity-for-decision-making_ token, although it may have other formats, or be the combination of several metrics.

This value will be used to decide if an entity can vote, and what's the weight of this vote.

_In the case of Bitcoin, this is how many times a miner has been the first to find the block hash within a defined amount of blocks._

_In the case of nation state elections, this your ID card._

_In the first iteration of [Uumm](https://xavivives.github.io/Uumm/), this is a number of contributions done by an entity._

# System failure

Most (I really mean 'most') systems end up compromising its own interest (#1) in order to make the system usable (#3). And so many others have a direct or indirect way to exchange merit (#2) and therefore compromise integrity.

## Tokenetization problem
Tokenizing merit is very hard, and I belive it to be one of the root causes for failure.

Most governances make use of a mix of certificates, test, recomendations, reputation... to validate the capacites of an entity. Then, a special credential is given to the entity that allows for its opinion to be heard.

This is mostly a manual process, making the system slow and prone to mistakes, and on top of that, extra processes are required to peridically re-evalute the entity capacities.

# Smart meritocracy

Governance has been one of the main use-cases for smart contracts.

The transparency of the blockchain and the programable and authentication capabilites of smart-contracts makes them very suitable.

To my knowledge, though, no project has reconsidered how they approach merit.

## Whitelisting merit

As previously described in the analog/centralized world, the voting rights are defined in the identity credentials... not for its current merit. That forces the system to constatnly have to revaluate these credentials.

By white-listing capacities (merit) instead of identites (usually people) we can have a governance system, more open and adaptable while adhering to the system goals, and still being compatible with old governance systems.

## Accessible metrics
How do you abstract all the necessary capacities to make an specialized decision and represent them in a single number while in a decentralized/trustless enviroment?

Some capacities are easy to tokenize: time spent working at X, age, IQ, ownership of Y, citizenship. The ones that really matter are too abstract: knowledge, intentions, insight, fidelity, trust... The latter are relatively easy on the analog world but a little harder on a turstless enviroment.


## Reputation systems

Like in the analog world we can use the past as an indicator of the future. We can quantify proven capacities, and use them as merit.

Within this context, merit defines a required capacity of an entity to make decisions, while reputation is a proven record of a capacity.

This makes reputation systems very suitable for governance.

## Finding concensus

Whatever metrics the system uses to define merit all the participants need to agree on the state of these metrics.

### Blockchains
Blockchains are an intuitve answer for proving identity. Projects like [UPort](https://www.uport.me/) and [Blockstack](https://blockstack.org/) make it already possible.

Currently, for most of the metrics the data is unlikley to be available in the blockchain. Current blockchains are too expensive, and most of decentralized platforms tend to minimize what they write in it.

Most important, most of platforms are still highly centralized, and so is its data.

### Trusted third parties
An alternative approach is to use a trusted third party to provide the required metric. Just by digitally signing the required data, we can have a full bridge to the none-decentralized world.

### Subjective reputation
In general when we talk about reputation, we refer to _subjective_ reputation. How does an entity _feel_ about something. The fact that it is _subjective_ doesn't mean it can't be useful. Like the above, participants just need to agree what entity will be used to digitally sign the reputation metric.

## Tokenetization solution
There is no need to explain how good smart-contracts are for creating tokens.

A smart contract can validate the necessary metrics, compute them and generate a none-exchangable token that represents the merit of an entity.

If a system can migrate or upgrade the token, we now can tweak the system goals in real time.

Now we can use this token to represent voting rights.


# Conclusion
Different systems need different capacities to make decisions.
Most governances are corrupted in some sense do to the lack of tools to evaluate merit properly.

It is up to each system to decide what metrics to use to compute its own 'ideal' merit token, one that represents the system values and the required capacities to make decisions on it.

By whitelisting merit instead of identities we can:

- Keep the goals of the system transparent and clear
- Eliminate the process of evaluating the entities capacities
- Make the system identity agnostic, making it open to anyone.

Smart contracts are extremely well suited for it.

With the new decentralized paradigm we can now build systems that define merit with an accuracy that we never had before. This should allow for a substantial increase in the quality of governance.

## Aditional notes
To keep things simple I left things out of the current document.
Here there are some subjects I believe are worth to explore.

### Governance for governements
Nation states, and certain types of communities, are none-voluntary by nature. Its citizen never agreed on the fundamentals that should drive their nation (maybe their antecesors, or an small representation, but not the current citizens).

A [constitution](https://en.wikipedia.org/wiki/Constitution) represents this fundaments. An inmutable document that roughly descrives the principles that drive an ever changing society.

The result is that the principles are outdated or unclear, making it no duable to define merit.

Instead, citizens could vote on what is valuable to them. The agragated results  could then be used to automatically compute the definition of merit itself.

The voting wouldn't have to be time-framed. Instead a citizen could at any given time, change its own values, and the merit for governing the system would be updated. 

The idea of the citizens voting on they are expert's on (which is about themself) is borrowed from [Ralph Merkle](https://en.wikipedia.org/wiki/Ralph_Merkle)'s draft _[DAOs, Democracy and Governance] (http://merkle.com/papers/DAOdemocracyDraft.pdf)_

_Note: I'm from Catalonia, where we are forbiden to express our opinion about how do we want our sovereignty [because... 'Constitution'](http://www.reuters.com/article/us-spain-politics-catalonia/spain-blocks-catalan-independence-vote-threatens-charges-idUSKCN1BI1GQ?il=0)_

### Prediction markets
There has been a lot of talk about the role that prediction markets could have on governance.

When the results of the decisions can be easily measured and the pool of participants is high [futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/) looks very good, but it makes it only doable on a very narrow scope.

These systems are especially interesting because they add a strong incentive layer.

### Proxy voting
[Proxy voting](https://en.wikipedia.org/wiki/Proxy_voting) or [Liquid democracy](https://en.wikipedia.org/wiki/Delegative_democracy) are commonly suggested improvements that the new paradigm makes easy to implement.

The way I see it, it makes merit exchangeable, therefore breaking property #2.

### Wisdown of the crowds
It seems that a significant part of decentralized governance projects share the idea that the [wisdom of the crowds](https://en.wikipedia.org/wiki/Wisdom_of_the_crowd) is a good approach for decision making

This was clearly represented by the DAO but, the same approach has been used for other projects later on. On top of the problems derived by making the merit exchangble this [post] (https://forum.daohub.org/t/the-dao-are-we-taking-the-wisdom-of-the-crowd-too-far/1486/8) also explains how bad of an idea this is.

While we could consider The Dao an experiment, I will argue that most of current projects (most of them with ICOs) are not interested in the long-term viablility of the project. Instead their single goal is to just benefit from the fundraising.
They use the noble idea of inclusion, and give everyone the right of making decisions.

### Questions
- Is there any wrong assumption on this document?
- Are there better alternative ways to access metrics?
- Are there better ways to define merit?
- Could subjective reputation be used on decentralized governance without the need of a trusted third party?
- Will it make sense for the described meritocracy to strongly reward any participation (voting), whatever the decision is correct or not?


# Examples
These examples are to show how current governance system fits on the described meritocracy
_The numbers (1,2,3) make reference to the previously described merit properties_


## Nation state elections
**Decisions to make:** Choose the representatives

**Participants:** Legal citizens

**Merit properties:**

1. The required merit is to be a citizen.
2. Merit is bound to your identity, therefore can't be exchanged
3. Merit is tokenized by using ID cards. Each ID card is one vote.

**Reality (undesired consequences):**

1. All the participants (whatever they have the right capacities to make good decisions or not) have the same decision power. There is no required skill to vote.
2. While the ID card can't be exchanged, the opinion of the participants can be easily manipulated by media (especially because they don't have the capacities to understand the problems (#1)) which is manipulated by lobbyist, which are the entities with more economic power. 
3. Id cards tokenize merit but not without compromising the other properties.

## Bitcoin
**Decisions to make:** Change the protocol rules

**Participants:** Miners

**Merit properties:**

1. The required merit is a proof that it recently secured the network by validating transactions 
2. POW can't be exchanged. It is also directly attached to the coinbase reward, disincentivizing any attempt.
3. How many times a miner has been the first to find the block hash within a defined amount of blocks.

**Reality (undesired consequences):**

1. Miners don't want network upgrades that don't maximize their profit. A brutal amount of electricity is used.
2. All good here
3. All good here.

## A company department
**Decisions to make:** What features of a product should we focus, who to hire, how much to pay?

**Participants:** Head of the department

**Merit properties:**

1. Someone with expertise on the subject, with fidelity to the company.
2. The merit is being himself, can't be exchanged, can be influenced.
3. Role defined in its contract ( a consequence of the time working for the company, resume...)
