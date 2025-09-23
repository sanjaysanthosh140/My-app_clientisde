import React, { useState, useEffect } from "react";
import "./Stackcomponent.css";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Stackcomponent(stack) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const stacklis = stack.stack;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `http://localhost:4000/admin_side/Get_stack?stack=${stacklis}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((response) =>
          response.json().then((data) => {
            const preve = data.stacks;
            setCards(preve);
            console.log(preve);
          })
        );
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (title) => {
    switch (title) {
      case "AI_web_tools": {
        navigate("/AI_web_tools");
        break;
      }
      case "AI_SQL_query_tools": {
        navigate("/db_query");
        break;
      }
      case "API": {
        navigate("/api");
        break;
      }
      case "AI_APP_tools": {
        navigate("/app");
        break;
      }
      // Drop_ship
      case "Drop_shiping": {
        navigate("/web_design_tools");
        break;
      }
      case "google_ADD's": {
        navigate("/google_add");
        break;
      }
      case "Shopify_store": {
        navigate("/shopify_store");
        break;
      }
      case "SEO_TOOLS": {
        navigate("/seo_tool");
        break;
      }
      //ai_detetion;
      case "AI_DETECTOR": {
        navigate("/ai_free_tools");
        break;
      }
      case "AI_Bypasser": {
        navigate("/ai_bypasser");
        break;
      }
      case "AI_Content_detector": {
        navigate("/ai_content_detect");
        break;
      }
      case "AI_Humanizor": {
        navigate("/ai_humanizor");
        break;
      }

      // ai_education_tools
      case "AI_Education_tools": {
        navigate("/edu_tool");
        break;
      }
      case "image_analist": {
        navigate("/edu_img");
        break;
      }
      case "mind_maping": {
        navigate("/edu_mind_map");
        break;
      }
      case "video_summizor": {
        navigate("/edu_video");
        break;
      }

      // video_generator
      case "AI_Video_Generator": {
        navigate("/AI_Video_Generator");
        break;
      }
      case "Ai_video_summarizor": {
        navigate("/Ai_video_summarizor");
        break;
      }
      case "convert_to_short": {
        navigate("/convert_to_short");
        break;
      }
      case "UGC_video": {
        navigate("/UGC_video");
        break;
      }

      default: {
        alert(title);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        {cards.map((card, index) => (
          <React.Fragment key={card.id || index}>
            <input
              type="radio"
              name="slide"
              id={`card-${index}`}
              defaultChecked={index === 0}
            />
            <label
              htmlFor={`card-${index}`}
              className="card"
              style={{
                backgroundImage: `url(http://localhost:4000/uploads/${card.image})`,
              }}
            >
              <div className="row">
                <div
                  className="icon"
                  onClick={() => {
                    handleClick(card.title);
                  }}
                >
                  {<FaExternalLinkAlt />}
                </div>
                <div className="description">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Stackcomponent;
