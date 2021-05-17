enum orderByEnum {
    asc = 0,
    desc = 1,
}

export interface findAllQuery {
    page:number
    limit:number
    search:string
    order_by:orderByEnum
}
