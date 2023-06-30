import { createContext, useContext, useCallback } from "react";
import { useToggle } from "../hooks/useToggle";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import accordionStyles from "./styles/accordionStyles.module.css";

// Create context API
const AccordionContext = createContext();
const { Provider } = AccordionContext;

const Accordion = (props) => {
  const { title, content } = props;
  const { status: expand, toggleStatus: toggleExpand } = useToggle();
  const value = { expand, toggleExpand };

  return (
    <Provider value={value}>
      <div className={accordionStyles.accordion}>
        <AccordionHeader>{title}</AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </div>
    </Provider>
  );
};

// Header
// Header
const AccordionHeader = ({ children }) => {
  const { toggleExpand, expand } = useContext(AccordionContext);

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent form submission behavior
    toggleExpand();
  };

  return (
    <button
      className={`${accordionStyles.button} ${expand ? accordionStyles.expanded : ''}`}
      onClick={handleButtonClick}
    >
      {children}
      <AccordionIcon
        iconOpened={<FaChevronUp />}
        iconClose={<FaChevronDown />}
      />
    </button>
  );
};


// Content
const AccordionContent = ({ children }) => {
  const { expand, toggleExpand } = useContext(AccordionContext);

  const handleMouseLeave = useCallback(() => {
    if (expand && toggleExpand) {
      toggleExpand();
    }
  }, [expand, toggleExpand]);

  const handleItemClick = useCallback((value) => {
    // Perform the logic to save the clicked item's value
    console.log('Clicked item:', value);
  }, []);

  return (
    <>
      {expand && (
        <ul className={accordionStyles.content} onMouseLeave={handleMouseLeave}>
          {children.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// Icon
const AccordionIcon = ({ iconOpened, iconClose }) => {
  const { expand } = useContext(AccordionContext);
  return <span>{expand ? iconOpened : iconClose}</span>;
};

export default Accordion;
