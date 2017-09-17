# Broken meritocracy // Redefining meritocracy?

This document explores why most governance systems fail, and it attempts to create a simple frame to spot some of the problems.

It also suggests how decentralized technologies like blockchains and smart contracts could solve some of the issues and significantly improve the results of the decision making processes.

## Redefining

>  [Meritocracy](https://en.wikipedia.org/wiki/Meritocracy) is a political philosophy stating that power should be vested in individuals almost exclusively based on ability and talent.

Within the context of this document, I won't be refering to political systems or goverments specifically but to any decision making process.

Also, because `power` is not the same as `power of making decisions` I'll redefine meritocracy to the following:

> ####Meritocracy is the idea that decisions should be taken by the entities better qualified for it.


# Meritocracy as a base
All governance systems are a subset of Meritocracy if you understand _merit_ as the feature that defines the right of an entity opinion to be considered (vote).

_For ease of use and simplification I put some examples [in this document](https://github.com/xavivives/Uumm/blob/master/support/Merit%20Examples.md). You may want to check it out if something doesn't make total sense._

_And for the same reasons I narrowed down the relevant merit properties to the following:_

## The ideal merit

 1. Defines what's of value to the system in order to make decisions.
 2. Can't be a medium of exchange
 3. Needs to be quantifiable

### 1. Merit defines value

For the system to work, the definition of merit needs to be aligned with the system goals.

It should tell what is of value to the system in order to make decisions. In this sense, merit is used as a filter, only the entities with certain capacities can participate in the decision making process.

If defined broadly or incorrectly the system is likely to have [unintended consequences](http://lesswrong.com/lw/y3/value_is_fragile/) or be gamed.

I'm using _capacities_ as opposed to _skills_ because it can also represent things like _ideology_, _IQ_, _experience_, _dedication_.

### 2. Merit is not a currency
It is not a [medium of exchange](https://en.wikipedia.org/wiki/Currency).

If you can trade the merit you end up with a system ruled by the entities that have more economic power and any required capacity intrinsic to the merit is gone.

In consequence, the goal of the systems is reduced to maximizing its profit and the entities that rule it don't have the necessary capacities to do so (other than having economic power).

### 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate in a system that can scale, we need merit in a quantifiable format.

This should be some sort of (no-exchangeable) _capacity-for-decision-making_ token, although it may have other formats, or be the combination of several metrics.

This value will be used to decide if an entity can vote, and what's the weight of its vote.

_In the case of Bitcoin, this is how many times a miner has been the first to find the block hash within a defined amount of blocks._

_In the case of nation state elections, this your ID card._

# System failure

Most (I really mean 'most') systems end up compromising its own interest (#1) in order to make the system usable (#3). And so many others have a direct or indirect way to exchange merit (#2) and therefore compromise its integrity.

## Tokenetization problem
Tokenizing merit is very hard, and I believe it to be one of the root causes for failure.

Most governances make use of a mix of certificates, test, recommendations, reputation... to validate the capacity of an entity. Then, a special credential is given to the entity that allows for its opinion to be heard.

This is mostly a manual process, making the system slow and prone to mistakes, and on top of that, extra processes are required to periodically re-evaluate the entity capacities.

# Smart meritocracy

Governance has been one of the main use-cases for smart contracts.

The transparency of the blockchain and the programmable and authentication capabilities of smart-contracts makes them very suitable.

To my knowledge, though, no project has reconsidered how they approach merit.

## Whitelisting merit

As previously described in the analog/centralized world, the voting rights are defined in the identity credentials... not for its current merit. That forces the system to constantly have to re-evaluate these credentials.

By [white-listing](https://en.wikipedia.org/wiki/Whitelist) capacities (merit) instead of entities (usually people), we can have a governance system that is identity agnostic.

This would allow for anyone/anything to be a potential participant (kids, AI, other governances, anonymous entities).

It makes the system more adaptable (just redefine the merit equation) while adhering to the system goals, and still being compatible with old governance systems (you can always make that a required capacity is to be someone).

## Accessible metrics
How do you abstract all the necessary capacities to make a specialized decision and represent them in a single number while in a decentralized/trustless environment?

Some capacities are easy to tokenize: time spent working at X, age, IQ, ownership of Y, citizenship. The ones that really matter are too abstract: knowledge, intentions, insight, fidelity, trust... The latter is relatively easy in the analog world but a little harder on a trustless environment.


### Reputation systems

Like in the analog world we can use the past as an indicator of the future. We can quantify proven capacities, and use them as merit.

Within this context, merit defines a required capacity of an entity to make decisions, while reputation is a proven record of a capacity.

This makes reputation systems very suitable for governance.

## Finding consensus

Whatever metrics the system uses to define merit all the participants need to agree on the state of these metrics.

### Blockchains
Blockchains are an intuitive answer for proving identity. Projects like [UPort](https://www.uport.me/) and [Blockstack](https://blockstack.org/) make it already possible.

Currently, for most of the metrics, the data is unlikely to be available in the blockchain. Current blockchains are too expensive, and most of the decentralized platforms tend to minimize what they write in it.

Most importantly, most of the platforms are still highly centralized, and so is its data.

### Trusted third parties
An alternative approach is to use a trusted third party to provide the required metric. Just by digitally signing the required data, we can have a full bridge to the none-decentralized world.

### Subjective reputation
In general, when we talk about reputation, we refer to _subjective_ reputation. How does an entity _feel_ about something? The fact that it is _subjective_ doesn't mean it can't be useful. Like the above, participants just need to agree what entity will be used to digitally sign the reputation metric.

## Tokenization solution
There is no need to explain how good smart-contracts are for creating tokens.

A smart contract can validate the necessary metrics, compute them and generate a none-exchangeable token that represents the merit of an entity.

If a system can migrate or upgrade the token, we now can tweak the system goals in real time.

Now we can use this token to represent voting rights.


# Conclusion
Different systems need different capacities to make decisions.
Most governances are corrupted in some sense due to the lack of tools to evaluate merit properly.

It is up to each system to decide what metrics to use to compute its own 'ideal' merit token, one that represents the system values and the required capacities to make decisions on it.

By whitelisting merit instead of identities we can:

- Keep the goals of the system transparent and clear
- Eliminate the process of evaluating the entities capacities.
- Make the system identity agnostic, making it open to anyone/anything
- The system is backward compatible (the list of whitelisted identities is a subset of the result of the whitelisted merit)
Smart contracts are extremely well suited for it.
- Allow the system to easily adapt to new circumstances

With the new decentralized paradigm, we can now build systems that define merit with an accuracy that we never had before. This should allow for a substantial increase in the quality of governance.

## Aditional notes
Here there are some subjects I naively believe are worth mentioning and/or exploring.

### Prediction markets
There has been a lot of talk about the role that prediction markets could have on governance.

If the results of the decisions can be easily measured and the pool of participants is high, [futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/) seems a promising idea but it's an approach limited to very specific governances.

These systems are especially interesting because they add a strong incentive layer, that I believe is worth exploring.

### Proxy voting
[Proxy voting](https://en.wikipedia.org/wiki/Proxy_voting) or [Liquid democracy](https://en.wikipedia.org/wiki/Delegative_democracy) are commonly suggested improvements that the new paradigm makes easy to implement.

The way I see it, it makes merit exchangeable, therefore breaking property #2.

### Governance for governments
Nation states and certain types of communities are none-voluntary by nature. It's citizen never agreed on the fundamentals that should drive their nation (maybe their antecessors, or a small representation, but not the current citizens).

A [Constitution](https://en.wikipedia.org/wiki/Constitution) represents these pillars. An immutable document that roughly describes the principles that drive an ever changing society. 

These principles are at the very least outdated or unclear, making the government gamble.

I believe the presented model could be used to improve this situation.

It may seem hard to apply because there are no clear values, therefore we can't define merit.

Instead each citizen could vote on its own principles and values. The aggregated results could then be used to automatically compute the definition of merit itself. 

The voting wouldn't have to be time-framed. Instead, a citizen could at any given time, change its own values, and the merit for governing the system would be updated in real time. 

The definition of merit could be considered some sort of consititution.

The idea of the citizens voting on what they are experts on (which is about themselves) is borrowed from [Ralph Merkle](https://en.wikipedia.org/wiki/Ralph_Merkle)'s draft _[DAOs, Democracy and Governance](http://merkle.com/papers/DAOdemocracyDraft.pdf)_

_Note: I'm from Catalonia, where we are forbidden to express our opinion about how do we want our sovereignty, and the reason is that [the Spanish constitution says so](http://www.reuters.com/article/us-spain-politics-catalonia/spain-blocks-catalan-independence-vote-threatens-charges-idUSKCN1BI1GQ?il=0)_

### Meritocracy into practice
This document is part of the [Uumm](https://xavivives.github.io/Uumm/) project.

We're currently trying to set the foundations to design and build better governances.

This document is an attempt to expose the philosophy behind it, so the community can iterate and point to any flaw.

You're very welcome to join us on this exploration. No merit required.