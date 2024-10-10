import React, { useState, useEffect, useMemo } from "react";
import "./styles.scss";
import BackButton from "../../../../components/Button/back";
import TitlePanel from "../../../../components/TitlePanel";
import {
  ClickableTile,
  ContainedList,
  ContainedListItem,
  ExpandableSearch,
  Heading,
  ProgressBar,
  Tile,
  Pagination,
  Button,
  Link,
  Modal,
  TextInput,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  NumberInput,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import Image from "next/image";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";
import AdviceModal from "./LoadingModal";
function MedicalStatus({ handleBackToDashboard }) {
  const [loading, setLoading] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [date, setDate] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const [headache, setHeadache] = useState("");
  const [visionIssues, setVisionIssues] = useState("");
  const [chestPain, setChestPain] = useState("");
  const [breathingDifficulty, setBreathingDifficulty] = useState("");
  const [leftLegPain, setLeftLegPain] = useState("");
  const [leftHandPain, setLeftHandPain] = useState("");
  const [rightHandPain, setRightHandPain] = useState("");
  const [rightLegPain, setRightLegPain] = useState("");
  const [Records, setRecords] = useState(null);
  const [OverallHealthScore, setOverallHealthScore] = useState(null);
  const [image, setImage] = useState("");
  const bodyPartImages = {
    Head: "/human/head.png",
    Torso: "/human/Torso.png",
    LeftLeg: "/human/LeftLeg.png",
    LeftHand: "/human/LeftHand.png",
    RightHand: "/human/RightHand.png",
    RightLeg: "/human/RightLeg.png",
    Default: "/human/Default.png",
  };

  useEffect(() => {
    const getOveralHealthScore = async () => {
      const response = await App.get("/api/get-overall-healthscore/", {
        withCredentials: true,
      });
      const overallHealth = response.data.overall_health_score;
      setOverallHealthScore(overallHealth);
    };
    getOveralHealthScore();
  }, []);
  const getHealthColor = (percentage) => {
    if (percentage < 50) return "red";
    if (percentage < 75) return "orange";
    return "green";
  };

  const handleBodyPartChange = (selectedPart) => {
    setBodyPart(selectedPart);
    setImage(bodyPartImages[selectedPart] || bodyPartImages["Default"]);
  };

  const renderBodyPartFields = () => {
    switch (bodyPart) {
      case "Head":
        return (
          <>
            <TextInput
              id="headache"
              labelText="Headache Severity (1-10)"
              value={headache}
              onChange={(e) => setHeadache(e.target.value)}
            />
            <TextInput
              id="vision-issues"
              labelText="Vision Issues"
              placeholder="yes or no"
              value={visionIssues}
              onChange={(e) => setVisionIssues(e.target.value)}
            />
          </>
        );
      case "Torso":
        return (
          <>
            <TextInput
              id="chest-pain"
              labelText="Chest Pain (1-10)"
              value={chestPain}
              onChange={(e) => setChestPain(e.target.value)}
            />
            <TextInput
              id="breathing-difficulty"
              labelText="Breathing Difficulty (1-10)"
              value={breathingDifficulty}
              onChange={(e) => setBreathingDifficulty(e.target.value)}
            />
          </>
        );
      case "LeftLeg":
        return (
          <TextInput
            id="left-leg-pain"
            labelText="Left Leg Pain (1-10)"
            value={leftLegPain}
            onChange={(e) => setLeftLegPain(e.target.value)}
          />
        );
      case "LeftHand":
        return (
          <TextInput
            id="left-hand-pain"
            labelText="Left Hand Pain (1-10)"
            value={leftHandPain}
            onChange={(e) => setLeftHandPain(e.target.value)}
          />
        );
      case "RightHand":
        return (
          <TextInput
            id="right-hand-pain"
            labelText="Right Hand Pain (1-10)"
            value={rightHandPain}
            onChange={(e) => setRightHandPain(e.target.value)}
          />
        );
      case "RightLeg":
        return (
          <TextInput
            id="right-leg-pain"
            labelText="Right Leg Pain (1-10)"
            value={rightLegPain}
            onChange={(e) => setRightLegPain(e.target.value)}
          />
        );
      default:
        return null;
    }
  };
  const handleSubmit = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    try {
      setIsModalOpen(!isModalOpen);
      const bodyPartData = {
        Head: { headache, visionIssues },
        Torso: { chestPain, breathingDifficulty },
        LeftLeg: { leftLegPain },
        LeftHand: { leftHandPain },
        RightHand: { rightHandPain },
        RightLeg: { rightLegPain },
      };

      const response = await App.post(
        "/api/health-issues/",
        {
          bodyPart,
          symptom,
          image,
          date: formattedDate,
          ...bodyPartData[bodyPart],
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setNotificationProps({
          kind: "success",
          caption: "",
          title: "Success",
          subtitle: `${response.data.message}`,
          timeout: 3000,
        });
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      } else {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "Error",
          subtitle: `${response.data.message}`,
          timeout: 3000,
        });
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }

      setIsModalOpen(false);
      setSymptom("");
      setBodyPart("");
      setDate(new Date());
    } catch (error) {
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Error",
        subtitle: `An error occurred during issuing`,
        timeout: 3000,
      });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await App.get("/api/health-records/");
        if (response.data) {
          setRecords(response.data.data);
          setFilteredRecords(response.data.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRecords();
  }, []);

  const MyLists = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    useEffect(() => {
      if (Records) {
        const results = Records.filter((item) =>
          item.symptom.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      }
    }, [searchTerm, Records]);

    const handlePageChange = ({ page, pageSize }) => {
      setCurrentPage(page);
      setItemsPerPage(pageSize);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResults = searchResults.slice(startIndex, endIndex);

    return (
      <>
        <ContainedList
          style={{
            boxShadow: "0px 0px 10px var(--text-color-2)",
            border: "1px solid var(--primary-color-2)",
          }}
          label="Your Health"
          kind="on-page"
          action={
            <ExpandableSearch
              placeholder="Filter"
              labelText="Search"
              value={searchTerm}
              onChange={handleChange}
              closeButtonLabelText="Clear search input"
              size="lg"
            />
          }
        >
          {paginatedResults.map((item, key) => (
            <ContainedListItem
              key={key}
              style={{ border: "1px solid whitesmoke", fontSize: "16px" }}
              onClick={() => setSelectedBodyPart(item)}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "10px",
                    height: "100px",
                  }}
                  className="items"
                >
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt="item"
                    className="list-image"
                  />
                  <p className="list-desc">{item.symptom}</p>
                </div>

                <div
                  className="items"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    fontSize: "10px",
                  }}
                >
                  <p className="items">{item.date}</p>
                  <Link
                    className="items"
                    href="#"
                    renderIcon={() => <ArrowRight aria-label="Arrow Right" />}
                  />

                  <div
                    style={{
                      width: "20px",
                      height: "70px",
                      backgroundColor: getHealthColor(item.health_score),
                    }}
                  />
                </div>
              </div>
            </ContainedListItem>
          ))}
        </ContainedList>
        <Pagination
          page={currentPage}
          pageSize={itemsPerPage}
          pageSizes={[5, 10, 20, 30]}
          totalItems={searchResults.length}
          onChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <>
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}
      <div className="medications-hub">
        <TitlePanel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <BackButton onClick={handleBackToDashboard} />
            <Heading style={{ fontWeight: "bold" }}>Health Check</Heading>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "auto",
              height: "auto",
            }}
          >
            <ExpandableSearch
              size="lg"
              labelText="Search"
              closeButtonLabelText="Clear search input"
              id="search-expandable-1"
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
        </TitlePanel>
        <div className="medication-hub-container">
          <div className="overall-health">
            <div className="health-status">
              <Tile id="tile-1" style={{ width: "100%", height: "100%" }}>
                Your Overall Health
                <br />
                <br />
                <ProgressBar
                  helperText={`Health status: ${OverallHealthScore} %`}
                  value={OverallHealthScore || 50}
                  style={{ height: "100%" }}
                />
              </Tile>
            </div>
            <div className="health-segments">
              <MyLists listItems={Records} />
            </div>
          </div>
          <div className="body-segment">
            <div className="body-part">
              {selectedBodyPart ? (
                <Image
                  width={300}
                  height={300}
                  className="patient-image"
                  src={selectedBodyPart?.image}
                  alt={selectedBodyPart?.symptom || "Full Body"}
                />
              ) : (
                <Image
                  width={300}
                  height={300}
                  className="patient-image"
                  src={"/human/Default.png"}
                  alt={"Full Body"}
                />
              )}
            </div>

            <div className="check-up">
            <AdviceModal selectedBodyPart={selectedBodyPart} />
              <Button kind="primary" onClick={() => setIsModalOpen(true)}>
                I dont feel well
              </Button>
            </div>
          </div>
        </div>
        <Modal
          open={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          modalHeading="Report Health Issue"
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onRequestSubmit={handleSubmit}
        >
          <Select
            id="body-part-select"
            labelText="Select Body Part"
            onChange={(e) => handleBodyPartChange(e.target.value)}
          >
            <SelectItem value="Head" text="Head" />
            <SelectItem value="Torso" text="Torso" />
            <SelectItem value="LeftLeg" text="Left Leg" />
            <SelectItem value="LeftHand" text="Left Hand" />
            <SelectItem value="RightHand" text="Right Hand" />
            <SelectItem value="RightLeg" text="Right Leg" />
          </Select>

          <TextInput
            id="symptom"
            labelText="Symptom"
            placeholder="Describe your symptom"
            style={{ marginBottom: "1rem" }}
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
          <DatePicker
            dateFormat="m/d/Y"
            value={date}
            onChange={(dates) => setDate(dates[0])}
          >
            <DatePickerInput
              id="date-picker-input-id"
              placeholder="mm/dd/yyyy"
              labelText="Date"
              type="text"
            />
          </DatePicker>
          {renderBodyPartFields()}
        </Modal>
      </div>
    </>
  );
}

export default MedicalStatus;
