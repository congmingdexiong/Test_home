import { tap } from 'rxjs/operators';
import { interval, of } from "rxjs";

// const numbers = interval(1000);
const numbers = of(1, 2, 3, 4, 5);
const numbers$ = numbers.pipe(
      tap(n => {
        if (n > 3) {
            console.log('error');
            
          throw new TypeError(`Value ${ n } is greater than 3`);
        }
      })
    );
    numbers$.subscribe(data=>console.log())

// import { of } from 'rxjs';
// import { tap } from 'rxjs/operators';
 
// const source = of(1, 2, 3, 4, 5);
 
// source.pipe(
//   tap(n => {
//     if (n > 3) {
//         console.log('error');
        
//       throw new TypeError(`Value ${ n } is greater than 3`);
//     }
//   })
// )
// .subscribe({ next: console.log});