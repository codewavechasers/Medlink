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

function MedicalStatus({ handleBackToDashboard }) {
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
  const [visualAcuity, setVisualAcuity] = useState("");
  const [pupilReaction, setPupilReaction] = useState("");
  const [eyePressure, setEyePressure] = useState("");
  const [visualField, setVisualField] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulse, setPulse] = useState("");
  const [gaitAnalysis, setGaitAnalysis] = useState("");
  const [muscleStrength, setMuscleStrength] = useState("");
  const [ecg, setECG] = useState("");
  const [cardiacOutput, setCardiacOutput] = useState("");
  const [ejectionFraction, setEjectionFraction] = useState("");
  const [cognitiveFunction, setCognitiveFunction] = useState("");
  const [neurologicalExam, setNeurologicalExam] = useState("");
  const [mri, setMRI] = useState("");
  const [eeg, setEEG] = useState("");
  const [rangeOfMotion, setRangeOfMotion] = useState("");
  const [painLevel, setPainLevel] = useState("");
  const [xrayOrMRI, setXrayOrMRI] = useState("");
  const [Records, setRecords] = useState(null);
  const [OverallHealthScore, setOverallHealthScore] = useState(null);
  const [image, setImage] = useState("");
  const bodyPartImages = {
    Eyes: "../../../../eye.svg",
    Legs: "../../../../leg.svg",
    Heart: "../../../../heart.svg",
    Brain: "../../../../brain.svg",
    Back: "../../../../back.svg",
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
    setImage(bodyPartImages[selectedPart] || "");
  };
  const renderBodyPartFields = () => {
    switch (bodyPart) {
      case "Eyes":
        return (
          <>
            <TextInput
              id="visual-acuity"
              labelText="Visual Acuity"
              value={visualAcuity}
              onChange={(e) => setVisualAcuity(e.target.value)}
            />
            <NumberInput
              id="pupil-reaction"
              label="Pupil Reaction (ms)"
              value={pupilReaction}
              onChange={(e) => setPupilReaction(e.target.value)}
            />
            <NumberInput
              id="eye-pressure"
              label="Eye Pressure (mmHg)"
              value={eyePressure}
              onChange={(e) => setEyePressure(e.target.value)}
            />
            <NumberInput
              id="visual-field"
              label="Visual Field (degrees)"
              value={visualField}
              onChange={(e) => setVisualField(e.target.value)}
            />
          </>
        );
      case "Legs":
        return (
          <>
            <TextInput
              id="blood-pressure"
              labelText="Blood Pressure (mmHg)"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
            <NumberInput
              id="pulse"
              label="Pulse (bpm)"
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
            />
            <TextInput
              id="gait-analysis"
              labelText="Gait Analysis"
              value={gaitAnalysis}
              onChange={(e) => setGaitAnalysis(e.target.value)}
            />
            <NumberInput
              id="muscle-strength"
              label="Muscle Strength"
              value={muscleStrength}
              onChange={(e) => setMuscleStrength(e.target.value)}
            />
          </>
        );
      case "Heart":
        return (
          <>
            <TextInput
              id="ecg"
              labelText="ECG Results"
              value={ecg}
              onChange={(e) => setECG(e.target.value)}
            />
            <TextInput
              id="blood-pressure"
              labelText="Blood Pressure (mmHg)"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
            <NumberInput
              id="cardiac-output"
              label="Cardiac Output (L/min)"
              value={cardiacOutput}
              onChange={(e) => setCardiacOutput(e.target.value)}
            />
            <NumberInput
              id="ejection-fraction"
              label="Ejection Fraction (%)"
              value={ejectionFraction}
              onChange={(e) => setEjectionFraction(e.target.value)}
            />
          </>
        );
      case "Brain":
        return (
          <>
            <TextInput
              id="cognitive-function"
              labelText="Cognitive Function Test Results"
              value={cognitiveFunction}
              onChange={(e) => setCognitiveFunction(e.target.value)}
            />
            <TextInput
              id="neurological-exam"
              labelText="Neurological Exam Results"
              value={neurologicalExam}
              onChange={(e) => setNeurologicalExam(e.target.value)}
            />
            <TextInput
              id="mri"
              labelText="MRI Results"
              value={mri}
              onChange={(e) => setMRI(e.target.value)}
            />
            <TextInput
              id="eeg"
              labelText="EEG Results"
              value={eeg}
              onChange={(e) => setEEG(e.target.value)}
            />
          </>
        );
      case "Back":
        return (
          <>
            <NumberInput
              id="range-of-motion"
              label="Range of Motion (degrees)"
              value={rangeOfMotion}
              onChange={(e) => setRangeOfMotion(e.target.value)}
            />
            <NumberInput
              id="muscle-strength"
              label="Muscle Strength"
              value={muscleStrength}
              onChange={(e) => setMuscleStrength(e.target.value)}
            />
            <NumberInput
              id="pain-level"
              label="Pain Level (1-10)"
              min={1}
              max={10}
              value={painLevel}
              onChange={(e) => setPainLevel(e.target.value)}
            />
            <TextInput
              id="xray-or-mri"
              labelText="X-ray or MRI Results"
              value={xrayOrMRI}
              onChange={(e) => setXrayOrMRI(e.target.value)}
            />
          </>
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
        Eyes: { visualAcuity, pupilReaction, eyePressure, visualField },
        Legs: { bloodPressure, pulse, gaitAnalysis, muscleStrength },
        Heart: { ecg, bloodPressure, cardiacOutput, ejectionFraction },
        Brain: { cognitiveFunction, neurologicalExam, mri, eeg },
        Back: { rangeOfMotion, muscleStrength, painLevel, xrayOrMRI },
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
        subtitle: `An error occured during issueing`,
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    height: "100%",
                  }}
                  className="items"
                >
                  <img src={item.image} alt="item" className="list-image" />
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
              {selectedBodyPart && (
                <Image
                  width={300}
                  height={300}
                  className="patient-image"
                  src={
                    selectedBodyPart
                      ? selectedBodyPart.image
                      : "../../../../human.svg"
                  }
                  alt={
                    selectedBodyPart ? selectedBodyPart.symptom : "Full Body"
                  }
                />
              )}
            </div>
            <div className="check-up">
              <Button kind="ghost">View checkup</Button>
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
          {/* <Select
          id="select-1"
          defaultValue="placeholder-item"
          labelText="Body Part"
          onChange={(e) => setBodyPart(e.target.value)}
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          {Records.map((item, index) => (
            <SelectItem
              key={index}
              value={item.bodyPart}
              text={item.bodyPart}
            />
          ))}
        </Select> */}
          <Select
            id="body-part-select"
            labelText="Select Body Part"
            onChange={(e) => handleBodyPartChange(e.target.value)}
          >
            <SelectItem value="Eyes" text="Eyes" />
            <SelectItem value="Legs" text="Legs" />
            <SelectItem value="Heart" text="Heart" />
            <SelectItem value="Brain" text="Brain" />
            <SelectItem value="Back" text="Back" />
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
