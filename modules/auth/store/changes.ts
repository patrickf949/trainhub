const checkLoggedIn = ()=>{
    if (typeof window !== 'undefined'){
        console.log(localStorage.getItem('token'))
        console.log(localStorage.getItem('token')?true:false);
        return localStorage.getItem('token')?true:false;
    }
    console.log('Fails');
}
const storeUserDetails=(token)=>{
    if (typeof window !== 'undefined') {
        localStorage.setItem("token",token);
        // console.log('after storing:=>'+localStorage.getItem('token'));
    }

}
export {checkLoggedIn,storeUserDetails}