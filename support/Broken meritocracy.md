# Broken meritocracy

# Meritocracy as a base
All governance systems are a subset of [Meritocracy](https://en.wikipedia.org/wiki/Meritocracy) if you understand _merit_ as the feature that defines the right of an entity opinion to be considered (vote).

By white-listing capacities (merit) instead of identites (usually people) we can have governance system, more open and adaptable while keep being truth to the system goals, and still being compatible with old governance systems.

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

In consequence, you end up with a system where the goal is to maximize profit and the entities that rule it don't have the necessary capacities to do so (other than having economic power).

`Fun game: How many ICOs and platforms use ERC20 tokens and other currencies for governance?`

### 3. Tokenized merit
This is not a desired feature but a limitation. In order to operate in a system that can scale, we need merit in a quantifiable format.

This should be some sort of (no-exchangeable) _capacity-for-decision-making_ token, although it may have other formats, or be the combination of several metrics.

This value will be used to decide if an entity can vote, and what's the weight of this vote.

_In the case of Bitcoin, this is how many times a miner has been the first to find the block hash within a defined amount of blocks._

_In the case of nation state elections, this your ID card._

_In the first iteration of [Uumm](https://xavivives.github.io/Uumm/), this is a number of contributions done by an entity._

## System failure

Most (I really mean 'most') systems end up compromising its own interest (#1) in order to make the system usable (#3). And so many others have a direct or indirect way to exchange merit (#2) and therefore compromising its integrity.

### Tokenetization problem
How do you abstract all the necessary capacities to make an specialized decision and represent them in a single number?

Some capacities are easy to tokenize: time spent working at X, age, IQ, ownership of Y, citizenship...

Others are too abstract: knowledge, intentions, insight, fidelity, trust...
I belive those are the ones that matter the most. In these cases we can use reputation systems.

#### Reputation systems

Since we can't directly tokenize them, we can use the past as an indicator of the future. We can quantify proven capacities, and use it as merit.

Within this context, merit defines a required capacity of an entity to make decisions, while reputation is a proven record of a capacity.

This makes reputation systems very suitable for governance.


### Concensus problem

Whatever metrics we use to define merit we all need to agree over the state of a these metrics (at least the participants)

#### Blockchains
Blockcahins seems like an intuitve answer, and for things like proving an identity they're probably the best approach. Projects like UPort and Blockstack make that already possible.

For most of the metrics though, the data is unlikley to be available in the blockchain. Current blockchains are too expensive, and most of decentralized platforms tend to minimize what they write in it.

Most important, most of platforms are still highly centralized.

#### Trusted third parties
We can always trust a third party to digitally sign a certificate.
That way we can have a company to prove that someone was a formal employee or we could use and digital state id to prove that someone is above certain age.


#### Subjective reputation
In general when we talk about reputation, we refer to subjective reputation. How do an entity _feels_ about something. Each entity may have a different opinon.

 like [identifi](https://github.com/identifi/) and [Trust Graph](https://github.com/trustgraph/trustgraph) work on P2P basis.


# Conclusion

Is up to each system to decide how to compute merit. But is likely that it will use several reputation metrics to do so. The more data liquidity the system has, the more accurate the merit can be, and therefore the better the outcome of the governance.

As far as I can imagine, a system that can access and compute the necessary reputation metrics in order to build its own 'ideal' merit token, is the closest we can be to a governance truth to its goals.

## Aditional notes
To keep things simple I left some things out of the current document.
I'll love to keep extending it. Feedback is welcome as always.

### Prediction markets
There has been a lot of talk about the role that prediction markets could have on governance.

When the results of the decisions can be easily measured and the pool of participants is high [futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/) seems a very interesting approach, but it makes it only doable on a very narrow scope.

These systems are especially interesting because they add a strong incentive layer.

### Proxy voting
[Proxy voting](https://en.wikipedia.org/wiki/Proxy_voting) or [Liquid democracy](https://en.wikipedia.org/wiki/Delegative_democracy) are commonly suggested improvements that the new paradigm makes easy to implement.

The way I see it, it makes merit exchangeable, therefore breaking property #2.


### Questions
- Is there any wrong assumption on this document?
- Are there better alternatives to reputation?
- Could subjective reputation be used on decentralized governance? How?
- Will it make sense for the described meritocracy to strongly reward any participation (voting), whatever the decision is correct or not?


# Examples
This examples are to show how current governance system fits on the described meritocracy
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