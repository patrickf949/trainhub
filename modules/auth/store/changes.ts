const empty = ''
const checkLoggedIn:()=>boolean = ()=>{
    if (rendered()){
        return sessionStorage.getItem('token')?true:false;
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
        return sessionStorage.getItem('token');
    }
    return empty
}
const storeUserDetails:(token:string)=>string=(token:string)=>{
    if (rendered()) {
        sessionStorage.setItem("token",token);
    }
    return empty

}
export {checkLoggedIn,storeUserDetails,getToken}