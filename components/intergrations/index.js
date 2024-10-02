import { Button } from "@carbon/react";
import React from "react";
import "./styles.scss";
import Link from "next/link";
function Intergrations() {
  return (
    <section className="intergration-apis">
      <div className="intergration-container">
        <div className="inergrated-icons">
          <div className="icons">
            <img src="../../intergration-images/ai-bot.png" alt="AI bot"/>
          </div>
        </div>
        <div className="intergrated-title">AI Bot Marketplace</div>
        <div className="intergrated-description">
          Explore diverse AI bots, publish your creations and boost profits in
          our open marketplace. Unleash innovative and earn with GPTBots.
        </div>
        <div className="learn-more-btn">
          <Link
            target="_blank"
            href={
              "https://www.ibm.com/products/watsonx-assistant/artificial-intelligence"
            }
          >
            <Button kind="tertiary">Learn More</Button>
          </Link>
        </div>
      </div>
      <div className="intergration-container">
        <div className="inergrated-icons">
          <div className="icons">
          <img src="../../intergration-images//watson-discovery.jpg" alt="Watson Discovery"/>

          </div>
        </div>
        <div className="intergrated-title">Watson Discovery</div>
        <div className="intergrated-description">
          Leverage Watson Discovery to analyze and understand your data, making
          it easy to find hidden insights and patterns.
        </div>
        <div className="learn-more-btn">
          <Link
            target="_blank"
            href={"https://www.ibm.com/products/watson-discovery"}
          >
            <Button kind="tertiary">Learn More</Button>
          </Link>
        </div>
      </div>
      <div className="intergration-container">
        <div className="inergrated-icons">
          <div className="icons">
          <img src="../../intergration-images/natural-understanding.jpeg" alt="Natural understanding"/>

          </div>
        </div>
        <div className="intergrated-title">
          Watson Natural Language Understanding
        </div>
        <div className="intergrated-description">
          Utilize Watson Natural Language Understanding to extract meaningful
          insights from your text data through sentiment analysis, entity
          recognition, and more.
        </div>
        <div className="learn-more-btn">
          <Link
            target="_blank"
            href={
              "https://www.ibm.com/products/watson-discoveryhttps://www.ibm.com/products/natural-language-understanding"
            }
          >
            <Button kind="tertiary">Learn More</Button>
          </Link>
        </div>
      </div>
      <div className="intergration-container">
        <div className="inergrated-icons">
          <div className="icons">
          <img src="../../intergration-images/assistant.jpeg" alt="Assistant"/>

          </div>
        </div>
        <div className="intergrated-title">Watson Assistant Integration</div>
        <div className="intergrated-description">
          Integrate Watson Assistant into your applications to provide
          conversational AI capabilities and enhance customer engagement.
        </div>
        <div className="learn-more-btn">
          <Link
            target="_blank"
            href={"https://www.ibm.com/products/watsonx-assistant/integrations"}
          >
            <Button kind="tertiary">Learn More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Intergrations;
