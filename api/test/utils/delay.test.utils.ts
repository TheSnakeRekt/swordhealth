export const delay = (interval: number, reason: string)=>{
    return it(reason, done => 
    {
       setTimeout(() => done(), interval)
 
    }).timeout(interval + 100);
}