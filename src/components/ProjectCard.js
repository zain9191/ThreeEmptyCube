import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import githubLogo from "../assets/Logos/githubLogo.png";
import toolLogos from "./toolLogos";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Ensure this import is correct

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    background: "none",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 30000,
  },
};

const ProjectCard = ({
  title,
  description,
  subdescription,
  imageUrlSmall,
  imageUrlLarge,
  link,
  website,
  tools = [],
  images = [],
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsReversed(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const buttons = document.querySelectorAll('button');
    const customLabels = document.querySelectorAll('.custom-label');

    if (modalIsOpen) {
      canvas.style.display = 'none';
      buttons.forEach(button => {
        button.style.display = 'none';
      });
      customLabels.forEach(label => {
        label.style.display = 'none';
      });
    } else {
      canvas.style.display = 'block';
      buttons.forEach(button => {
        button.style.display = 'block';
      });
      customLabels.forEach(label => {
        label.style.display = 'block';
      });
    }
  }, [modalIsOpen]);

  useEffect(() => {
    const html = document.documentElement;
    if (modalIsOpen) {
      html.classList.add("no-scroll");
      console.log("Dispatching hideCube event");
      const hideCubeEvent = new CustomEvent('hideCube');
      window.dispatchEvent(hideCubeEvent);
    } else {
      html.classList.remove("no-scroll");
      console.log("Dispatching showCube event");
      const showCubeEvent = new CustomEvent('showCube');
      window.dispatchEvent(showCubeEvent);
    }
    return () => {
      html.classList.remove("no-scroll");
    };
  }, [modalIsOpen]);

  const openModal = () => {
    console.log("Opening modal");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalIsOpen(false);
  };

  return (
    <div className={`project-a__card ${isReversed ? "reverse-order" : ""}`}>
      <img
        src={isReversed ? imageUrlSmall : imageUrlLarge}
        alt={title}
        className={`project-a__img ${isReversed ? "reverse-order" : ""}`}
        onClick={openModal}
      />
      <div className={`project-a__details ${isReversed ? "reverse-order" : ""}`}>
        <h3 className="project-a__h3 project-title-hover">{title}</h3>
        <h4 className="project-a__h4">{subdescription}</h4>
        <p className="project-a__description">{description}</p>

        <div className="project-a__tools">
          <span>Built with:</span>
          <div className="project-a__tools--logos">
            {tools.map((tool, index) => (
              <span key={index} className="tool">
                <img src={toolLogos[tool]} alt={tool} className="tool-logo" />
                <br />
              </span>
            ))}
          </div>
        </div>

        <div className="project-a__links">
          <a
            className="project-a__link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="GitHub Logo" className="gitLogo" />
            View on GitHub
          </a>
          {website && (
            <a
              className="project-a__link"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Image Preview"
        shouldFocusAfterRender={true}
        bodyOpenClassName="no-scroll"
      >
        <button onClick={closeModal} className="modal-close-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="carousel-container">
          <Carousel
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            thumbWidth="800"
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-image-container">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
