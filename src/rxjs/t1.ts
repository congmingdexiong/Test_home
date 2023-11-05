import { mergeMap, take, toArray, takeUntil, tap } from 'rxjs/operators';
import { interval, of } from "rxjs";


const source = interval(1000).pipe();
// source.subscribe(item=>console.log(item))


const observable  = interval(1000)
// observable.subscribe(x=>console.log(x))
source.subscribe(x=>console.log(x))
// observable.subscribe(x=>console.log(x))