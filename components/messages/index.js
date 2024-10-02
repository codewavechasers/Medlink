import App from "@/app/api/api";
import {
  ContainedList,
  ContainedListItem,
  ExpandableSearch,
} from "@carbon/react";
import React, { useState, useEffect } from "react";

function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch appointment notifications
        const appointmentResponse = await App.get("/bookings/api/notifications/");
        if (appointmentResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }

        // Fetch medication notifications
        const medicationResponse = await App.get("/api/get-notifications/");
        if (medicationResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }

        // Fetch timeline notifications
        const timelineResponse = await App.get("/reminders/get-timeline-notifications/");
        if (timelineResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }

        // Combine all notifications
        const combinedNotifications = [
          ...appointmentResponse.data,
          ...medicationResponse.data,
          ...timelineResponse.data,
        ];

        // Set notifications state
        setNotifications(combinedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const results = notifications.filter((notification) =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, notifications]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ContainedList
      className="messages"
      style={{
        position: "absolute",
        zIndex: "19000",
        right: "0",
        height: "350px",
        top: "100px",
        width: "350px",
        background: "var(--primary-color-2)",
        overflow: "auto",
      }}
      label="Inbox"
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
      {searchResults.length === 0 ? (
        <ContainedListItem>No messages to display</ContainedListItem>
      ) : (
        searchResults.map((notification, key) => (
          <ContainedListItem key={key}>
            {notification.message}
          </ContainedListItem>
        ))
      )}
    </ContainedList>
  );
}

export default Messages;
