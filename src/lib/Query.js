import { gql } from '@apollo/client';

export const GET_ALL_TOOLS = gql`
query ai_web_tools{
    ai_web_tools{
        name
        description
        officialurl
        category
        pricing
    }
}


`