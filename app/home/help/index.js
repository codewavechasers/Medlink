"use client"
import React, { useState, useEffect } from "react";
import { ExpandableSearch, Heading } from "@carbon/react";
import { Calendar, Chat, Person } from "@carbon/icons-react";
import HelpCard from "../../../components/Help-cards";
import "./styles.scss";
import ArticleCard from "../../../components/Article-card";
import Faqs from "../../../components/faq-card";
import QuickLink from "../../../components/QuickLink";
import MoreInquiry from "../../../components/more-inquiry";
function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineResults, setOnlineResults] = useState([]);
  const [error, setError] = useState(null);

  const QuickLinks = [
    {
      icon: <Chat size={32} />,
      title: "Finding the Right Doctor",
      description: "Tips on finding a doctor specialized in your condition",
      link: "https://www.webmd.com/health-insurance/how-to-choose-a-doctor",
    },
    {
      icon: <Person size={32} />,
      title: "Understanding Medical Tests",
      description: "Explaining common medical tests and what they indicate",
      link: "https://www.webmd.com/a-to-z-guides/lab-test-results",
    },
    {
      icon: <Calendar size={32} />,
      title: "Healthcare Providers Near You",
      description:
        "Find healthcare providers and facilities near your location",
      link: "https://doctor.webmd.com/",
    },
  ];

  const ArticleList = [
    {
      icon: <Chat size={32} />,
      title: "Dealing with Chronic Back Pain",
      description: "Effective strategies for managing chronic pain",
      link: "https://www.webmd.com/back-pain/features/causes",
    },
    {
      icon: <Person size={32} />,
      title: "Understanding Diabetes",
      description: "Comprehensive guide to diabetes management and care",
      link: "https://www.webmd.com/diabetes/default.htm",
    },
    {
      icon: <Chat size={32} />,
      title: "Understanding Hypertension",
      description: "Essential information on managing high blood pressure",
      link: "https://www.webmd.com/hypertension-high-blood-pressure/default.htm",
    },
  ];

  const cardList = [
    {
      icon: <Chat size={64} />,
      title: "Get started with AI Advisor",
      description:
        "Learn how WatsonX.ai can transform your illness into recommendation effectively.",
      videoUrl: "/videos/watsonx.mp4",
    },
    {
      icon: <Person size={64} />,
      title: "Booking Appointments",
      description: "Discover howw you can book appointments in Medlink.",
      videoUrl: "/videos/appointment.mp4",
    },
    {
      icon: <Calendar size={64} />,
      title: "Medlink",
      description:
        "Explore how you can add a timeline in Medlink and get notifications on your phone.",
      videoUrl: "/videos/timeline.mp4",
    },
  ];

  const faqList = [
    {
      question: "How to get started?",
      description:
        "To get started, simply sign up on our platform and explore the available features. You can customize your profile and start using our services right away.",
    },
    {
      question: "How to book an appointment?",
      description:
        "Booking an appointment is easy! Log in to your account, navigate to the appointments section, choose your preferred date and time, and confirm your booking. You will receive a confirmation email shortly after.",
    },
  ];

  const fetchOnlineResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
        searchQuery
      )}&format=json&origin=*`;

      const response = await fetch(url);
      const data = await response.json();

      const titles = data[1].join("|");
      const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
        titles
      )}&origin=*`;

      const extractResponse = await fetch(extractUrl);
      const extractData = await extractResponse.json();

      const pages = extractData.query.pages;
      const searchResults = data[1].map((title, index) => ({
        title,
        description: data[2][index],
        link: data[3][index],
        preview: pages[index + 1]?.extract || "No preview available",
      }));

      setOnlineResults(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Error fetching search results. Please try again later.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchOnlineResults();
    } else {
      setOnlineResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredQuickLinks = QuickLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery) ||
      link.description.toLowerCase().includes(searchQuery)
  );

  const filteredArticles = ArticleList.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery) ||
      article.description.toLowerCase().includes(searchQuery)
  );

  const filteredCards = cardList.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery) ||
      card.description.toLowerCase().includes(searchQuery)
  );

  const filteredFaqs = faqList.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery) ||
      faq.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="help-container">
      <section className="help-header">
        <Heading
          style={{
            fontWeight: "bold",
            width: "50%",
            paddingLeft: "20px",
            fontSize: "25px",
          }}
        >
          Help Center
        </Heading>
        <ExpandableSearch
          size="lg"
          labelText="Search Medlink"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={handleSearchChange}
          onKeyDown={handleSearchChange}
        />
      </section>
      <section className="help-body">
        <div className="top-help">
          <div className="help-info">
            <Heading className="find">
              Find Answers to your
              <br /> questions
            </Heading>
            <div className="answered">
              Maybe you are looking for something we have already answered!
            </div>
          </div>
        </div>
        <section className="help-cards">
          <div className="floating-header">
            <Heading className="heading-floating">
              Learn More About our Activities
            </Heading>
          </div>
          <div className="help-card-container">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <HelpCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  videoUrl={card.videoUrl}
                />
              ))
            ) : (
              <div>No data found.</div>
            )}
          </div>
        </section>
        <section className="popular-articles">
          <Heading className="articles">Popular Articles</Heading>
          <div className="my-articles">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  icon={article.icon}
                  title={article.title}
                  description={article.description}
                  link={article.link}
                />
              ))
            ) : (
              <div>No data found.</div>
            )}
          </div>
        </section>
        <section className="faqs">
          <Heading className="faq-heading articles">FAQs</Heading>
          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <Faqs
                  key={index}
                  question={faq.question}
                  description={faq.description}
                />
              ))
            ) : (
              <div>No data found.</div>
            )}
          </div>
        </section>
        <section className="links">
          <Heading className="quick-header articles">Quick Links</Heading>
          <div className="quick-links">
            {filteredQuickLinks.length > 0 ? (
              filteredQuickLinks.map((quick, index) => (
                <QuickLink
                  key={index}
                  title={quick.title}
                  icon={quick.icon}
                  description={quick.description}
                  link={quick.link}
                />
              ))
            ) : (
              <div>No data found.</div>
            )}
          </div>
        </section>
        <section className="more-results">
          <Heading className="more-results-heading articles">
            More Results from Online
          </Heading>
          <div className="online-results">
            {loading ? (
              <div>Fetching more results...</div>
            ) : error ? (
              <div>{error}</div>
            ) : onlineResults.length > 0 ? (
              <div className="result">
                {onlineResults.map((result, index) => (
                  <QuickLink
                    key={index}
                    icon={result.icon}
                    description={result.description}
                    title={result.title}
                    link={result.link}
                  />
                ))}
              </div>
            ) : (
              <div>No more results found.</div>
            )}
          </div>
        </section>
        <section className="inquiry">
          <MoreInquiry />
        </section>
      </section>
    </div>
  );
}

export default Help;
