import {React, useState, useEffect} from "react";
import "./styles.scss";
import BackButton from "../../../components/Button/back";
import TitlePanel from "../../../components/TitlePanel";
import {
  ExpandableSearch,
  ExpandableTile,
  Heading,
  TileAboveTheFoldContent,
} from "@carbon/react";
import {
  LogoDiscord,
  LogoInstagram,
  LogoTwitter,
  PhoneVoiceFilled,
} from "@carbon/icons-react";


const Doctor = ({
  imageSrc,
  name,
  discordLink,
  instagramLink,
  phone,
  twitterLink,
  speciality,
}) => (
  
  <div className="doctor-tile">
    <ExpandableTile
      id="expandable-tile-1"
      tileCollapsedIconText="Call the doctor"
    >
      <TileAboveTheFoldContent>
        <div style={{ height: "auto" }} className="doctor-container">
          <div className="doctors-image">
            <img className="image" src={imageSrc} alt="doctor image" />
          </div>
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
              {" "}
              <PhoneVoiceFilled size={64} />
            </div>
            <div className="doctor-social-links">
              <LogoTwitter href={twitterLink} size={32} />
              <LogoInstagram href={instagramLink} size={32} />
              <LogoDiscord href={discordLink} size={32} />
            </div>
          </div>
        </div>
      </TileAboveTheFoldContent>
    </ExpandableTile>
  </div>
);

function NextAppointments({ handleBackToDashboard, doctorItems }) {
  const doctors = [
    {
      id: 1,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. John Doe",
      phone: "+1234567890",
      speciality: "Cardiologist",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 2,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 3,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 4,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 5,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    {
      id: 6,
      imageSrc: "../../../doctor.jpg",
      name: "Dr. Jane Smith",
      phone: "+0987654321",
      speciality: "Pediatrician",
      discordLink: "#",
      twitterLink: "#",
      instagramLink: "#",
    },
    // Add more doctor objects as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = doctorItems.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, doctorItems]);

  return (
    <div className="appointments-hub">
      <TitlePanel>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <BackButton onClick={handleBackToDashboard} />
          <Heading>Book An Appointment Today</Heading>
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
          {" "}
          {doctors.map((doctor) => (
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

      <div className="myAppointments-hist">
        <Heading>My Appointments</Heading>
      </div>
    </div>
  );
}

export default NextAppointments;
