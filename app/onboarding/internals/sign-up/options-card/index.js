import { React, useState } from "react";
import "./styles.scss";
import { ArrowRight } from "@carbon/icons-react";
import Link from "next/link";
import { Loading } from "@carbon/react";

function OptionCard({ icon, title, description, href, disabled }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link
      className={`option-cont ${disabled ? "disabled" : ""}`}
      href={href}
      onClick={()=>setIsLoading(true)}
    >
      <div className={`option-card ${disabled ? "disabled" : ""}`}>
        <div className="option-icon">{icon}</div>
        <div className="option-info">
          <div className="option-info-flex">
            <div className="opt-title">{title}</div>
            <div className="opt-description">{description}</div>
          </div>
          {isLoading ? (
            <div className="arrow">
              <Loading withOverlay={false} small />
            </div>
          ) : (
            <div className="arrow">
              <ArrowRight size={32} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default OptionCard;
