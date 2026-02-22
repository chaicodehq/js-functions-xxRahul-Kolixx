/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  let votes = {}
  let registered = new Set()
  

  const registerVoter = (voter) => {
    //validation
    if(!voter || Object.keys(voter).length===0 || voter.age < 18 ) return false

    if(!registered.has(voter.id)){
       registered.add(voter.id)
       return true
    } else {
      return false
    }
  }

  const castVote = (voterId, candidateId, onSuccess, onError)=>{
    let isRegistered = false
    let validCheck2 = false
    let validCheck3 = false

    if(registered.has(voterId)) isRegistered = true

    for(let candidate of candidates){
      if(candidate.id === candidateId){
        validCheck2 = true
        break
      }
    }

    if(!votes[voterId]){
       validCheck3 = true
    }

    if(isRegistered && validCheck2 && validCheck3) { 
      votes[voterId] = candidateId
      return onSuccess({voterId,candidateId})
    }
    else return onError("reason string")
   
  }

  const getResults = (sortFn) => {
    let result = []
    const candidateIds = Object.values(votes);
    candidates.forEach((candidate)=>{
        const {name,age,id} = candidate
        const votes = candidateIds.filter((canId)=> canId===candidate.id).length
        result.push({name,age,id,votes})
    })
    if(sortFn){
      result.sort(sortFn)
    } else {
      result.sort((a,b)=>b.votes-a.votes)
    }
    return result
  }

  const getWinner = ()=>{
    if(Object.values(votes).length===0){
      return null
    }

    const result = getResults()

    return result[0]

  }

  return {
    castVote,
    registerVoter,
    getResults,
    getWinner,
  }
}

export function createVoteValidator(rules) {
  // Your code here
  if(!rules) return function(){}

  const voterValidation =(voter) => {
    const {minAge , requiredFields} = rules

    for(let requiredField of requiredFields){
       if (!(requiredField in voter))
         return { valid: false, reason: `${requiredField} is missing` };
    }

    if(voter.age <minAge) return { valid: false, reason: `voter age is less than ${minAge}` };

    return {valid: true,reason: `All required fields are present and voter's age is ${voter.age}`}
  }
  return voterValidation
}

export function countVotesInRegions(regionTree) {
  // Your code here
  if(!regionTree) return 0
  
  let sum = regionTree.votes

  for(let subRegion of regionTree.subRegions){
    sum +=  countVotesInRegions(subRegion)
  }

  return sum
 
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  if(candidateId in currentTally){
      return {...currentTally,[candidateId]:currentTally[candidateId] + 1 }
  } else {
    return {...currentTally,[candidateId]:1}
  }
}


