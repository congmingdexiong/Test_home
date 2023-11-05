import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { from, of } from "rxjs"

const a = ['apple','banana']

const obs = of(a).pipe(
    mergeMap(data=>data),
    map((data)=>{
        return printConsole(data);
    }),toArray()
)
const map1:{[index:string]:string} ={
    "apple":'1',
    "banana":'3'
}

const printConsole = (el:string)=>{
    // console.log('method printConsole ' +map1[el]);
    return map1[el]
    
}


obs.subscribe(data=>{
    console.log(data);
})