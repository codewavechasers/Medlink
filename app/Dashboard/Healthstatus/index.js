import React, { useState, useEffect } from "react";
import "./styles.scss";
import BackButton from "../../../components/Button/back";
import TitlePanel from "../../../components/TitlePanel";
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
} from "@carbon/react";
import {
  ArrowRight,
  SkipBackFilled,
  SkipForwardFilled,
} from "@carbon/icons-react";

function MedicalStatus({ handleBackToDashboard }) {
  const MyLists = ({ listItems }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    useEffect(() => {
      const results = listItems.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }, [searchTerm, listItems]);

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
              style={{ border: "1px solid whitesmoke" }}
            >
              <div
                style={{
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
                  }}
                >
                  <img
                    src={item.image}
                    alt="item"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <p>{item.description}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <p>{item.date}</p>
                  <Link
                    href="#"
                    renderIcon={() => <ArrowRight aria-label="Arrow Right" />}
                  >
                    View History
                  </Link>
                </div>
              </div>
            </ContainedListItem>
          ))}
        </ContainedList>
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText="Items per page:"
          onChange={handlePageChange}
          page={currentPage}
          pageSize={itemsPerPage}
          pageSizes={[10]}
          size="md"
          totalItems={searchResults.length}
        />
      </>
    );
  };

  // Example list items
  const listItems = [
    {
      image: "../../vercel.svg",
      description: "List item 1",
      date: "2023-06-01",
    },
    {
      image: "../../vercel.svg",
      description: "List item 2",
      date: "2023-06-02",
    },
    {
      image: "../../vercel.svg",
      description: "List item 3",
      date: "2023-06-03",
    },
    {
      image: "../../vercel.svg",
      description: "List item 3",
      date: "2023-06-03",
    },
    {
      image: "../../vercel.svg",
      description: "List item 3",
      date: "2023-06-03",
    },
    //we can later push items inside here
  ];

  return (
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
          <Heading style={{ fontWeight: "bold" }}>
            Health Check: You are doing Great!
          </Heading>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "20%",
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
              <ProgressBar helperText="Health status" value={75} />
            </Tile>
          </div>
          <div className="health-segments">
            <MyLists listItems={listItems} />
          </div>
        </div>
        <div className="body-segment">
          <div className="body-part">
            <img className="patient-image" src="../human.svg" alt="human body"/>
            <div className="navigate-body">
              <SkipBackFilled size={32} />
              <SkipForwardFilled size={32} />
            </div>
          </div>
          <div className="check-up">
            <Button kind="ghost">view checkup</Button>
            <Button kind="primary">I dont feel well</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalStatus;
