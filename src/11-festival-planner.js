/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here

  let festivals = []

  let festivalNames = new Set()

  const addFestival = (name,date,type) => {
    //validation
    if(!name || typeof date !== 'string') return -1
    if(type !== 'religious' && type !== 'national' && type !== 'cultural') return -1
    
    if(!(festivalNames.has(name))){
      festivalNames.add(name)
      festivals.push({name,date,type})
    } else return -1

    return festivals.length
  }

  const removeFestival = (name) => {
    if(festivalNames.has(name)){
       
      let idxOfToBeDeleted 

       festivals.forEach((festival,idx)=>{
        if(festival.name === name) idxOfToBeDeleted = idx
      })

      festivals.splice(idxOfToBeDeleted,1)

      return festivalNames.delete(name)
    }
    return false
  }

  const getAll = ()=>{
    return [...festivals]
  }

  const getByType = (type) => {
    return festivals.filter((festival)=> festival.type===type)
  };

  const getCount = ()=>{
    return festivalNames.size
  }

  const getUpcoming = (currentDate,n=3)=>{
     if(typeof currentDate !== 'string' || ! Number.isInteger(n) || n <= 0) return []

      //currentDate = Number.parseInt(currentDate.split('-').join(""))
      let festivalsCopy = [...festivals]

      festivalsCopy.sort((a, b) => {
        const aDate = Number.parseInt(a.date.split("-").join(""));
        const bDate = Number.parseInt(b.date.split("-").join(""));

        return aDate - bDate;
      });

      let counter =0

      const upcomingFests = festivalsCopy.filter((festival)=> {
         return  ((festival.date >= currentDate) && (counter++ < n))
      })

    return upcomingFests
  }

  return {
    addFestival,
    removeFestival,
    getAll,
    getCount,
    getUpcoming,
    getByType
  }

  
}
