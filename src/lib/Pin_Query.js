import { gql } from "@apollo/client"

export const USER_PINNED = gql`
query{
frv_toolslist{
    name
    description
    officialurl
    category
    pricing
 }
}

`