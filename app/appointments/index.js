import React, { useState } from "react";
import "./styles.scss";
import { ExpandableSearch, Heading, Pagination, Tag } from "@carbon/react";
import AppointmentDoctors from "../../components/Apointment-doctors";
import { ShoppingCartClear } from "@carbon/icons-react";
import MoreEnquiry from "../../components/more-inquiry";

// Sample data for doctors
const doctorsData = [
  { id: 1, image: "../../doctor.jpg", name: "John Doe", speciality: "Physio", rating: 4 },
  { id: 2, image: "../../doctor.jpg", name: "Jane Smith", speciality: "Optometry", rating: 5 },
  { id: 3, image: "../../doctor.jpg", name: "Emily Johnson", speciality: "Therapist", rating: 3 },
  { id: 4, image: "../../doctor.jpg", name: "Michael Brown", speciality: "Surgeon", rating: 4 },
  { id: 5, image: "../../doctor.jpg", name: "Chris Brown", speciality: "Optometry", rating: 4 },
  { id: 6, image: "../../doctor.jpg", name: "Michael Albeart", speciality: "Therapist", rating: 4 },
];

function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to the first page when changing tags
  };

  const handlePageChange = ({ page, pageSize }) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredDoctors = doctorsData.filter((doctor) =>
    (selectedTag === "All" || doctor.speciality === selectedTag) &&
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + pageSize);

  return (
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
              <MoreEnquiry/>

      </section>
    </div>
  );
}

export default Appointments;
