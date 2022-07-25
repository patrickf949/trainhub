import { genericItem } from "./store/types";

export function flattenArray(array:Array<genericItem>){
    return array.map(item=>item.id)
}

export function convertToString(field:any){
    return field?field.toString():null;
}
export function nonNullValues(obj:[]){
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v!=''));
}