const empty = ''
const checkLoggedIn:()=>boolean = ()=>{
    if (rendered()){
        return localStorage.getItem('token')?true:false;
    }
}

const rendered:()=>boolean = ()=>{
    if (typeof window !== 'undefined'){
        return true;
    }
    return false;
}
const getToken:()=>string = ()=>{
    if (rendered()){
        return localStorage.getItem('token');
    }
    return empty
}
const storeUserDetails:(token:string)=>string=(token:string)=>{
    if (rendered()) {
        localStorage.setItem("token",token);
    }
    return empty

}
export {checkLoggedIn,storeUserDetails,getToken}