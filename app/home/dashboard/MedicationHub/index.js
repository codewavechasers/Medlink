import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  DatePicker,
  DatePickerInput,
  Heading,
  Modal,
  Select,
  SelectItem,
  SkeletonPlaceholder,
  Stack,
  TextArea,
  TextInput,
  TimePicker,
  ToastNotification,
  Tooltip,
} from "@carbon/react";
import {
  BreakingChange,
  ChevronLeft,
  ChevronRight,
  Favorite,
  Hearing,
  ShoppingBag,
} from "@carbon/icons-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import TitlePanel from "@/components/TitlePanel";
import BackButton from "@/components/Button/back";
import Timeline from "../../../../components/Timeline";
import MyExpandableTile from "../../../../components/ExpandableTile";
import "./styles.scss";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

import NoDataDisplay from "./NoDataDisplay";
function MedicationHub({ handleBackToDashboard }) {
  const [timelines, setTimelines] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    Swal.fire({
      title: "Adding your timeline to Medlink",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        App.post("/reminders/set-timeline/", timelineData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
          .then((response) => {
            if (response.status != 200) {
              setNotificationProps({
                kind: "error",
                caption: "",
                title: "Network response invalid",
                subtitle: "Timeline setting failed",
                timeout: 3000,
              });
              setShowNotification(true);

              setTimeout(() => {
                setShowNotification(false);
              }, 3000);
              throw new Error("Network response was not ok");
            }
            return response.data;
          })
          .then((data) => {
            Swal.close();

            localStorage.removeItem("TimelineData");

            setNotificationProps({
              kind: "success",
              caption: "",
              title: "Success",
              subtitle: `Timeline: ${data.message}`,
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          })
          .catch((error) => {
            Swal.close();

            setNotificationProps({
              kind: "error",
              caption: "",
              title: "Setting Failed",
              subtitle: `An error occured`,
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
      },
    });
  };
  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        const response = await App.get(`/reminders/get-timeline/`, {
          method: "GET",
          withCredentials: true,
        });
        const data = response.data;
        setTimelines(data);
        // console.log("data", data);
      } catch (error) {
        console.error("error");
      }
    };

    fetchTimelines();
  }, []);
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await App.get(`/api/medication/`, {
          method: "GET",
          withCredentials: true,
        });
        const data = response.data;

        const transformedTiles = data.map((medication, index) => ({
          id: `tile-${index + 1}`,
          dbid: medication.id,
          heading: medication.heading,
          firstUseIcon: (
            <Tooltip
              label={medication.firstUseTooltip}
              enterDelayMs={0}
              leaveDelayMs={300}
            >
              <Favorite />
            </Tooltip>
          ),
          secondUseIcon: (
            <Tooltip
              label={medication.secondUseTooltip}
              enterDelayMs={0}
              leaveDelayMs={300}
            >
              <Hearing />
            </Tooltip>
          ),
          thirdUseIcon: (
            <Tooltip
              label={medication.thirdUseTooltip}
              enterDelayMs={0}
              leaveDelayMs={300}
            >
              <BreakingChange />
            </Tooltip>
          ),
          spoons: medication.spoons,
          afterBefore: medication.after_before,
          AmPm: medication.am_pm,
          daysLeft: medication.days_left,
          description: medication.description,
        }));

        setTiles(transformedTiles);
      } catch (error) {
        console.error("error");
      }
    };

    fetchPrescriptions();
  }, []);

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
      }, 1000);
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
  const [open, setOpen] = useState(false);
  const button = useRef();

  const [timelineData, setTimelineData] = useState({
    description: "",
    long_description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    const newTimelineData = {
      ...timelineData,
      [id]: value,
    };

    setTimelineData(newTimelineData);
    localStorage.setItem("TimelineData", JSON.stringify(newTimelineData));
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
      <Modal
        launcherButtonRef={button}
        modalHeading="Add a timeline to get a reminder"
        modalLabel="Medlink - virtual assistant"
        primaryButtonText="Set Timeline"
        secondaryButtonText="Cancel"
        open={open}
        height="auto"
        onRequestSubmit={handleSubmit}
        onRequestClose={() => setOpen(false)}
      >
        <p
          style={{
            marginBottom: "1rem",
          }}
        >
          Please fill the details below to have your timeline added to Medlink.
          Beware of the time and date you provide, to avoid collition of
          timelines. Welcome to Medlink.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <TextInput
              data-modal-primary-focus
              id="description"
              type="text"
              labelText="Timeline Name"
              placeholder="e.g Take Paracetamol 2 X 3"
              style={{
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              value={timelineData.description}
            />

            <TextArea
              id="long_description"
              type="text"
              labelText="Timeline Description"
              placeholder="e.g Provide a description"
              style={{
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              value={timelineData.long_description}
            />
            <Stack orientation="horizontal">
              <DatePicker
                datePickerType="single"
                dateFormat="Y-m-d"
                onChange={(dates) => {
                  const date = dates[0];
                  setTimelineData({
                    ...timelineData,
                    date: date.toISOString().split("T")[0],
                  });
                  localStorage.setItem(
                    "TimelineData",
                    JSON.stringify({
                      ...timelineData,
                      date: date.toISOString().split("T")[0],
                    })
                  );
                }}
                value={timelineData.date}
              >
                <DatePickerInput
                  id="date"
                  labelText="Date"
                  placeholder="MM/DD/YYYY"
                />
              </DatePicker>

              <TimePicker
                id="time"
                labelText="Time"
                onChange={handleChange}
                value={timelineData.time}
              />
            </Stack>
          </div>
        </div>
      </Modal>
      <motion.div
        className="medicationHub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TitlePanel>
          <div className="button-area">
            <BackButton onClick={handleBackToDashboard} />
            <Heading className="med-title" style={{ fontWeight: "bold" }}>
              Medication Hub
            </Heading>
          </div>
          <div className="medic-annotations">
            {isMobile ? (
              <Button
                kind="secondary"
                hasIconOnly
                ref={button}
                renderIcon={ShoppingBag}
                iconDescription="prescription"
                size="sm"
                onClick={() => setOpen(true)}
              />
            ) : (
              <Button
                kind="secondary"
                ref={button}
                size="sm"
                renderIcon={ShoppingBag}
                iconDescription="prescription"
                onClick={() => setOpen(true)}
              >
                Add a Timeline
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
          {timelines.length > 0 ? (
            <Timeline appointments={timelines} />
          ) : (
            <NoDataDisplay title="No Timelines set to show." text="There are no timelines to display. Add one at the top right." />          )}
        </div>
        <div className="my-prescriptions">
          {tiles.length > 0 ? (
            <AnimatePresence>
              {loading ? (
                <SkeletonPlaceholder
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                tiles.map((tile) => (
                  <motion.div
                    key={tile.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MyExpandableTile
                      dbid={tile.dbid}
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
          ) : (
            <NoDataDisplay title="No Prescriptions set to show." text="You are not yet prescribed any medication." />
          )}
        </div>
        {tiles.length > 0 ? (
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
        ) : (
          <></>
        )}
      </motion.div>
    </>
  );
}

export default MedicationHub;
