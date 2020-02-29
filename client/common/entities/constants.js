/**
 * Created by cashm on 23/05/2019.
 */

export function renderTimezoneOffset(offset){

    const parsedTimezone = parseInt(offset,10);
    if(isNaN(parsedTimezone)||(typeof parsedTimezone==='number'&&parsedTimezone===0)){
        return 'UTC'
    }
    if(parsedTimezone>0) {
        return `UTC+${parsedTimezone}`;
    }
    else{
        return `UTC${parsedTimezone}`;
    }
}