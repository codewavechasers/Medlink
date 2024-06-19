import React, { useState, useEffect } from "react";
import { Button, Heading, SkeletonPlaceholder, Tooltip } from "@carbon/react";
import {
  BreakingChange,
  ChevronLeft,
  ChevronRight,
  Favorite,
  Hearing,
  ShoppingBag,
} from "@carbon/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import TitlePanel from "@/components/TitlePanel";
import BackButton from "@/components/Button/back";
import Timeline from "../../../components/Timeline";
import MyExpandableTile from "../../../components/ExpandableTile";
import "./styles.scss";

function MedicationHub({ handleBackToDashboard }) {
  const appointments = [
    { time: "2024-06-09T08:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T07:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T06:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T59:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T04:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T11:00:00", description: "Team Standup" },
    { time: "2024-06-09T14:00:00", description: "Client Call" },
    { time: "2024-06-09T16:00:00", description: "Project Review" },
    { time: "2024-06-09T17:00:00", description: "Project Review" },
    { time: "2024-06-09T15:00:00", description: "Project Review" },
    { time: "2024-06-09T18:00:00", description: "Project Review" },
    { time: "2024-06-09T19:00:00", description: "Project Review" },
    { time: "2024-06-09T20:00:00", description: "Project Review" },
  ];

  const tiles = [
    {
      id: "tile-1",
      heading: "Paracetamol",
      firstUseIcon: (
        <Tooltip label="Helps Bones" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="Helps Brain" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="Helps Heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "2",
      afterBefore: "After",
      AmPm: "Pm",
      daysLeft: "7",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "tile-2",
      heading: "Ibuprofen",
      firstUseIcon: (
        <Tooltip label="Helps Bones" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="Helps Brain" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="Helps Heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "tile-5",
      heading: "Flagyl",
      firstUseIcon: (
        <Tooltip label="Helps Bones" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="Helps Brain" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="Helps Heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "tile-3",
      heading: "Piriton",
      firstUseIcon: (
        <Tooltip label="Helps Bones" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="Helps Brain" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="Helps Heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "tile-4",
      heading: "Cetrizine",
      firstUseIcon: (
        <Tooltip label="Helps Bones" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="Helps Brain" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="Helps Heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
  ];

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(tiles.length / pageSize);
  const visibleTiles = tiles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [expandedTile, setExpandedTile] = useState(null);

  const handleExpand = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLoading(false);
      }, 1000); // Simulating a delay of 1 second for demonstration
    }
  };
const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <motion.div
      className="medicationHub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TitlePanel>
        <div className="button-area">
          <BackButton onClick={handleBackToDashboard} />
          <Heading className="med-title" style={{ fontWeight: "bold" }}>Medication Hub</Heading>
        </div>
        <div className="medic-annotations">
          {isMobile ? (
            <Button
              kind="secondary"
              hasIconOnly
              renderIcon={ShoppingBag}
              iconDescription="prescription"
              size="sm"
            />
          ) : (
            <Button
              kind="secondary"
              size="sm"
              renderIcon={ShoppingBag}
              iconDescription="prescription"
            >
              Prescription
            </Button>
          )}
          {isMobile ? (
            <Button
            hasIconOnly
              renderIcon={ShoppingBag}
              kind="tertiary"
              iconDescription="over the shelf"
              size="sm"
            />
          ) : (
            <Button
              size="sm"
              hasIcon
              renderIcon={ShoppingBag}
              kind="tertiary"
              iconDescription="TrashCan"
            >
              Over the shelf
            </Button>
          )}
        </div>
      </TitlePanel>
      <div className="my-timeline">
        <Timeline appointments={appointments} />
      </div>
      <div className="my-prescriptions">
        <AnimatePresence>
          {loading ? (
            <SkeletonPlaceholder style={{ width: "100%", height: "100%" }} />
          ) : (
            visibleTiles.map((tile) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MyExpandableTile
                  id={tile.id}
                  heading={tile.heading}
                  firstUseIcon={tile.firstUseIcon}
                  secondUseIcon={tile.secondUseIcon}
                  thirdUseIcon={tile.thirdUseIcon}
                  spoons={tile.spoons}
                  afterBefore={tile.afterBefore}
                  AmPm={tile.AmPm}
                  daysLeft={tile.daysLeft}
                  description={tile.description}
                  expanded={expandedTile === tile.id}
                  onToggleExpand={handleExpand}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="pagination">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          hasIconOnly
          iconDescription="Previous page"
          renderIcon={ChevronLeft}
        />

        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          hasIconOnly
          iconDescription="Next page"
          renderIcon={ChevronRight}
        />
      </div>
    </motion.div>
  );
}

export default MedicationHub;
``;
