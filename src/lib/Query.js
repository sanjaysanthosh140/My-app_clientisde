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

export const GET_ALL_App = gql`
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



export const GET_ALL_API = gql`
query{
    ai_api_tools{
        name
        description
        officialurl
        category
        pricing

    }
}
`

export const GET_ALL_db = gql`
   query{
      ai_sql_tools{
        name
        description
        officialurl
        category
        pricing

      }

}
`
export const GET_ALL_WEB_DESIGN = gql`
  query{
    ai_web_design_tools{
    name
    description
    officialurl
    pricing
    category

 }
  }
 
 `

export const GET_MARKETING_AI_TOOL = gql`
query{
 ai_shopify_tools{
   name
   description
   officialurl
   category
   pricing
 }
}

`

export const ALL_SEO_TOOLS = gql`
query{
    ai_seo_tools{
        name
        description
        officialurl
        category
        pricing
    }
}
`


export const ALL_GOOGLE_ADD = gql`
query{
    ai_google_add_tools{
        name
        description
        officialurl
        category
        pricing
    }
}

`
// AI_DETECTOR
export const ALL_FREE_DETECTOR = gql`
query{
    ai_free_detector_tools{
        name
        description
        officialurl
        category
        pricing
    }
}
`

export const ALL_BYPASSERS = gql`
  query{
ai_bypasser_tools{
    name
    description
    officialurl
    category
    pricing
}
  }
`

export const ALL_CONTENT_DETECTOR = gql`
query{
ai_content_detector_tools{
    name
    description
    officialurl
    category
    pricing
}
}

`

export const ALL_HUMANIZOR = gql`
query{
 ai_humanizor_tools{
    name
    description
    officialurl
    category
    pricing
 }
}
`

// education_tools
export const ALL_EDU_KNOW_MANAGE = gql`
query{
    ai_know_manage_tools{
        name
        description
        officialurl
        pricing
        category
    }
}

`

export const ALL_EDU_IMG_TOOLS = gql`
 query{
   ai_image_analist_tools{
        name
        description
        officialurl
        pricing
        category
   }
 }
`

export const ALL_EDU_MIND_MANAGE_TOOLS = gql`
 query{
  ai_mind_map_tools{
       name
       description
       officialurl
       pricing
       category
  }

 }
`

export const ALL_EDU_VIDEO_ROOLS = gql`
 query{
    ai_video_summerizer_tools{
        name
        description
        officialurl
        pricing
        category
    }
 }

`
// video_edithing_&&-Generation
export const All_ai_video_generator = gql`
query{
ai_video_creator_tools{
      name
      description
      officialurl
      pricing
      category
}
}
`
export const All_ai_video_summarizor = gql`
query{
      ai_video_summerizor_tools{
          name
          description
          officialurl
          pricing
          category
      }
}
`
export const All_ai_convert_to_short = gql`
 query{
      ai_long_video_short_tools{
          name
          description
          officialurl
          pricing
          category
      }
 }
`
export const All_ai_ugc_video = gql`
query{
   ai_ugc_tools{
        name
       description
       officialurl
       pricing
       category
   }
}
`
