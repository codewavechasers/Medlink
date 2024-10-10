import React, { useState, useEffect } from "react";
import "./styles.scss";
import BackButton from "../../../../components/Button/back";
import TitlePanel from "../../../../components/TitlePanel";
import NextAppCard from "../../../../components/NextAppointmentCard";
import { ExpandableSearch, Heading, Pagination, Button } from "@carbon/react";
import {
  Calendar,
  LogoDiscord,
  LogoInstagram,
  LogoTwitter,
  PhoneVoiceFilled,
} from "@carbon/icons-react";
import App from "@/app/api/api";
const Doctor = ({
  imageSrc,
  name,
  discordLink,
  instagramLink,
  phone,
  twitterLink,
  speciality,
}) => {
  const handleCalls = () => {
    localStorage.setItem("selectedItem", "conferencing");
    const timeout = 2000;
    setTimeout(() => {
      window.location.href = "../../index.js";
    }, timeout);
  };

  return (
    <div className="doctor-tile">
      <div className="doctor-container">
        <div className="doctors-image">
          <img className="image" src={imageSrc} alt="doctor image" />
        </div>
        <div className="group-flex">
          <div className="doctors-info">
            <Heading style={{ fontWeight: "bold" }}>{name}</Heading>
            <p>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {speciality}
              </span>
            </p>
            <p>
              <span style={{ display: "inline-block", marginLeft: "30px" }}>
                {phone}
              </span>
            </p>
          </div>
          <div className="call-btn">
            <div className="call">
              <PhoneVoiceFilled
                onClick={handleCalls}
                className="call-icon"
                size={64}
              />
            </div>

            <div className="doctor-social-links">
              <a href={twitterLink}>
                <LogoTwitter size={32} />
              </a>
              <a href={instagramLink}>
                <LogoInstagram size={32} />
              </a>
              <a href={discordLink}>
                <LogoDiscord size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NextAppointments({ handleBackToDashboard }) {
  const doctors = [
    {
      id: 1,
      imageSrc: "../../../doctors/doc-1.jpeg",
      name: "Dr. John Doe",
      phone: "+1234567890",
      speciality: "Cardiologist",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 2,
      imageSrc: "../../../doctors/doc-2.jpeg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 3,
      imageSrc: "../../../doctors/doc-3.jpg",
      name: "Dr. Emily White",
      phone: "+1122334455",
      speciality: "Dermatologist",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 4,
      imageSrc: "../../../doctors/doc-4.jpeg",
      name: "Dr. Michael Brown",
      phone: "+5566778899",
      speciality: "Neurologist",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 5,
      imageSrc: "../../../doctors/doc-5.jpeg",
      name: "Dr. Sarah Green",
      phone: "+9988776655",
      speciality: "Oncologist",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 6,
      imageSrc: "../../../doctors/doc-6.jpeg",
      name: "Dr. William Black",
      phone: "+6655443322",
      speciality: "Orthopedic",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
  ];

  const appointments = [
    { id: 1, doctorName: "Dr. John Doe", date: "2024-06-20", time: "10:00 AM" },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      date: "2024-06-21",
      time: "11:00 AM",
    },
    {
      id: 3,
      doctorName: "Dr. Emily White",
      date: "2024-06-22",
      time: "12:00 PM",
    },
    {
      id: 4,
      doctorName: "Dr. Michael Brown",
      date: "2024-06-23",
      time: "01:00 PM",
    },
    {
      id: 5,
      doctorName: "Dr. Sarah Green",
      date: "2024-06-24",
      time: "02:00 PM",
    },
    {
      id: 6,
      doctorName: "Dr. William Black",
      date: "2024-06-25",
      time: "03:00 PM",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentDoctorPage, setCurrentDoctorPage] = useState(1);
  const [currentAppointmentPage, setCurrentAppointmentPage] = useState(1);
  const [appointments_history, setAppointments_history] = useState([]);
  const itemsPerPage = 3;

  const handleDoctorPageChange = ({ page }) => {
    setCurrentDoctorPage(page);
  };

  const handleAppointmentPageChange = ({ page }) => {
    setCurrentAppointmentPage(page);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDoctor = currentDoctorPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const indexOfLastAppointment = currentAppointmentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await App.get(
          `/bookings/fetch-appointments/`,
          {
            withCredentials:true,
            method:'GET'
          }
        );
        const data = response.data;
        setAppointments_history(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);
  function BookAppointment() {
    localStorage.setItem("selectedItem", "Appointments");

    const timeout = 2000;
    setTimeout(() => {
      window.location.href = "http://localhost:3000/home";
    }, timeout);
  }
  return (
    <div className="appointments-hub">
      <TitlePanel>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <BackButton onClick={handleBackToDashboard} />
          <Heading style={{ fontWeight: "bold" }}>
            Book An Appointment Today
          </Heading>
        </div>
        <div className="search-button">
          <ExpandableSearch
            size="lg"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-expandable-1"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </TitlePanel>

      <div className="available-doctor">
        <div className="doctors">
          {currentDoctors.map((doctor) => (
            <Doctor
              key={doctor.id}
              imageSrc={doctor.imageSrc}
              name={doctor.name}
              phone={doctor.phone}
              speciality={doctor.speciality}
              instagramLink={doctor.instagramLink}
              twitterLink={doctor.twitterLink}
              discordLink={doctor.discordLink}
            />
          ))}
        </div>
      </div>

      <Pagination
        totalItems={filteredDoctors.length}
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Doctors per page"
        page={currentDoctorPage}
        pageNumberText="Page Number"
        pageSize={itemsPerPage}
        pageSizes={[itemsPerPage]}
        onChange={handleDoctorPageChange}
      />

      <div className="myAppointments-hist">
        <Heading className="nextApp-title">My Appointments</Heading>
        <section className="next-appointments">
          {appointments_history.length > 0 ? (
            appointments_history.map((appointment) => (
              <NextAppCard
                key={appointment.id}
                id={appointment.id}
                name={appointment.doctor_name}
                test={appointment.problem_description}
                date={appointment.date}
                docImage={appointment.doctor_image}
                time={appointment.time}
                email={appointment.patient_email}
              />
            ))
          ) : (
            <Heading> You have not booked an appointment yet.</Heading>
          )}

          <div className="new-app">
            <Button
              renderIcon={Calendar}
              iconDescription="Book Appointment"
              onClick={BookAppointment}
              size="sm"
            >
              Book New Appointment
            </Button>
          </div>
        </section>
      </div>

      <Pagination
        totalItems={appointments.length}
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Appointments per page"
        page={currentAppointmentPage}
        pageNumberText="Page Number"
        pageSize={itemsPerPage}
        pageSizes={[itemsPerPage]}
        onChange={handleAppointmentPageChange}
      />
    </div>
  );
}

export default NextAppointments;
