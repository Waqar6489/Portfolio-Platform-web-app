export const SaveToken = (token)=>{
    localStorage.setItem('access_token',token.access)
    localStorage.setItem('refresh_token',token.refresh)
}

export const GetToken = ()=>{
    return localStorage.getItem('access_token')
}

export const ClearToken = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export const Auth =(url,options={})=>{
    const token = GetToken();
    const headers = options.headers?{...options.headers}:{};
    if (token)
        headers['Authorizations'] = `Bearer ${token}`;
        headers['Content-Type'] = 'apllications/json';
    return fetch(
        url,{
        ...options,
        headers
    })    
}