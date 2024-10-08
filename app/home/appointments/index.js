import React, { useState,useEffect } from "react";
import "./styles.scss";
import { ExpandableSearch, Heading, Pagination, Tag } from "@carbon/react";
import AppointmentDoctors from "../../../components/Apointment-doctors";
import { ShoppingCartClear } from "@carbon/icons-react";
import MoreEnquiry from "../../../components/more-inquiry";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
const doctorsData = [
  {
    id: 1,
    image: "../../doctors/doc-1.jpeg",
    name: "John Doe",
    speciality: "Physio",
    rating: 4,
  },
  {
    id: 2,
    image: "../../doctors/doc-2.jpeg",
    name: "Jane Smith",
    speciality: "Optometry",
    rating: 5,
  },
  {
    id: 3,
    image: "../../doctors/doc-3.jpg",
    name: "Emily Johnson",
    speciality: "Therapist",
    rating: 3,
  },
  {
    id: 4,
    image: "../../doctors/doc-4.jpeg",
    name: "Michael Brown",
    speciality: "Surgeon",
    rating: 4,
  },
  {
    id: 5,
    image: "../../doctors/doc-6.jpeg",
    name: "Chris Brown",
    speciality: "Optometry",
    rating: 4,
  },
  {
    id: 6,
    image: "../../doctors/doc-5.jpeg",
    name: "Michael Albeart",
    speciality: "Therapist",
    rating: 4,
  },
  {
    id: 6,
    image: "../../doctors/doc-3.jpeg",
    name: "Keter Gilbert",
    speciality: "Therapist",
    rating: 4,
  },
];

function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");
  
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      localStorage.setItem("selectedItem", "appointments");
      window.location.reload();
    } else {
      localStorage.setItem("hasRefreshed", "true");
    }
  }, []);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handlePageChange = ({ page, pageSize }) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      (selectedTag === "All" || doctor.speciality === selectedTag) &&
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <WithAuthRedirect>
    <div className="Appointments">
      <div className="app-header">
        <Heading className="heading">Appointment Type</Heading>
        <ExpandableSearch
          size="lg"
          labelText="Search doctor"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <section className="appointment-hub">
        <section className="tags">
          {["All", "Physio", "Optometry", "Therapist", "Surgeon"].map((tag) => (
            <Tag
              key={tag}
              className={`tag ${selectedTag === tag ? "selected" : ""}`}
              type="outline"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Tag>
          ))}
        </section>
        <section className="doctors-available">
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <AppointmentDoctors
                key={doctor.id}
                doctor={doctor}
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
              />
            ))
          ) : (
            <div className="no-results">
              <Heading
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingCartClear size={32} />
                No doctors found
              </Heading>
            </div>
          )}
        </section>
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText="Items per page:"
          onChange={handlePageChange}
          page={currentPage}
          pageSize={pageSize}
          pageSizes={[6]}
          size="md"
          totalItems={filteredDoctors.length}
        />
        <MoreEnquiry />
      </section>
    </div>
    </WithAuthRedirect>
  );
}

export default Appointments;
