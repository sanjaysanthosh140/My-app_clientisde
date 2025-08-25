import { gql } from '@apollo/client';

export const GET_ALL_TOOLS = gql`
query{
    ai_app_tools{
        name
        description
        officialurl
        category
        pricing
    }
}
`

export const GET_ALL_App=gql`
query{
    ai_web_tools{
        name
        description
        officialurl
        category
        pricing
    }
}
`









