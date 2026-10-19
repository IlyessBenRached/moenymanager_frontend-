export const  API_URL = process.env.NEXT_PUBLIC_API_URL;

export  interface ApiSuccess<T> {
    success : true;
    data : T;
    meta? : 
        { 
            pagination?: { page : number, limit : number , total : number};
            warnings? : string[]
        }
}


export  interface ApiFailure {
    success : false;
    error : 
        {       code : string;
                message : string;
                details? : Record<string, unknown>
        };
}


