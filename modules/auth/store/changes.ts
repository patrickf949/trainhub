const checkLoggedIn = ()=>{
    if (typeof window !== 'undefined'){
        return localStorage.getItem('token')?true:false;
    }
}
const storeUserDetails=(token)=>{
    if (typeof window !== 'undefined') {
        localStorage.setItem("token",token);
    }

}
export {checkLoggedIn,storeUserDetails}