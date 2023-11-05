import { interval } from "rxjs";
import {takeUntil} from 'rxjs/operators';


const source = interval(1000);
const clicks = interval(5000);
const result = source.pipe(takeUntil(clicks));
result.subscribe(x=>console.log(x));