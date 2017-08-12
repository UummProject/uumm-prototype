/*var Uumm = artifacts.require("./Uumm.sol")
var Web3 = new (require("web3"))

var Validators = require("./Validators.js")

const addressBook=
{
    PROJECT_CREATOR:0,
    CONTRIBUTOR1: 1,
    CONTRIBUTOR2: 2,
    CONTRIBUTOR3: 3,
    RANDOM_USER:9 //Never writes (only calls, no transfers)
}

contract('Uumm', async function(accounts)
{

    getAddress=(index)=>
    {
        return accounts[index]
    }

    const proposals =
    [
        {
            id:0,
            title:"P0,",
            reference:"R",
            valueAmount:100,
            address: getAddress(addressBook.PROJECT_CREATOR),
        },
        {
            id:1,
            title:"P1,",
            reference:"R",
            valueAmount:1,
            address: accounts[1]
        },
        {
            id:2,
            title:"P2,",
            reference:"R",
            valueAmount:1,
            address: accounts[2]
        },
        {
            id:3,
            title:"P3,",
            reference:"R",
            valueAmount:1,
            address: accounts[3]
        },
        {
            id:4,
            title:"P4,",
            reference:"R",
            valueAmount:1,
            address: accounts[4]
        },
        {
            id:5,
            title:"P5,",
            reference:"R",
            valueAmount:1,
            address: accounts[5]
        },
        {
            id:6,
            title:"P6,",
            reference:"R",
            valueAmount:1,
            address: accounts[6]
        },
        {
            id:7,
            title:"P7,",
            reference:"R",
            valueAmount:1,
            address: accounts[7]
        },
        {
            id:8,
            title:"P8,",
            reference:"R",
            valueAmount:1,
            address: accounts[8]
        }

    ]

    const contributors =
    [
        {
            //First contributor is empty
            id:0,
            contributorAddress:"",
            name:"",
            valueTokens:0,
            etherBalance:0
        },
        {
            id:1,
            contributorAddress:"",
            name:"",
            valueTokens:10,
            etherBalance:0.25
        },
        {
            id:2,
            contributorAddress:"",
            name:"",
            valueTokens:30,
            etherBalance:0.75
        }
    ]

    getAddress(addressBook.PROJECT_CREATOR)

    let uummInstance = await  Uumm.deployed()
    await uummInstance.CreateProject("A name", {from: getAddress(addressBook.PROJECT_CREATOR)})

    let project1Id = await uummInstance.GetProjectId(getAddress(addressBook.PROJECT_CREATOR), 0, {from: getAddress(addressBook.RANDOM_USER)})

    for(let i = 0; i<proposals.length; i++)
    {
        await uummInstance.CreateProposal(project1Id, proposals[i].title, proposals[i].reference, proposals[i].valueAmount,  {from:proposals[i].address})
        await uummInstance.VoteProposal(project1Id, proposals[i].id, true, {from: getAddress(addressBook.PROJECT_CREATOR)})
        await uummInstance.ResolveProposal(project1Id, proposals[i].id, {from: getAddress(addressBook.RANDOM_USER)})
    }
    

    //FUNDING

    it("...should split the funding", async function(){
        let etherAmount = 1
        let weiAmount = web3.toWei(etherAmount, "ether")

        //let transaction = await uummInstance.FundProject(project1Id, {from: getAddress(addressBook.RANDOM_USER), value: weiAmount})
        let contributorsLength = await uummInstance.GetContributorsLength.call(project1Id, {from: getAddress(addressBook.RANDOM_USER)})
        //assert.equal(contributorsLength.toNumber(), 2, "Two contributors exist")
        console.log(contributorsLength)
        for(let i = 0; i<contributorsLength.toNumber(); i++)
        {
            console.log(i)
            await Validators.validateContributorData(uummInstance, getAddress(addressBook.RANDOM_USER),  project1Id, contributors[i])
        }
    })    
})
*/