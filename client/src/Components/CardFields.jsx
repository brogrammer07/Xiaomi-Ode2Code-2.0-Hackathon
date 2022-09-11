import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { MdExpandMore } from "react-icons/md";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { Types } from "../Utils/TYPES";
const CardFields = ({ title, details, status }) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<MdExpandMore size={20} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div className="flex items-center space-x-6">
          {status ? (
            <AiFillCheckCircle size={20} color="#23c54e" />
          ) : (
            <AiOutlineCheckCircle size={20} />
          )}
          <h1>{title}</h1>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-[82%] mx-auto">
          {Object.entries(details).map((data) => (
            <div key={data[0]} className="flex items-center justify-between">
              <h3 className="font-bold">
                {Types.find((type, i) => type[0] === data[0])[1]}:
              </h3>
              <p className="">{data[1]}</p>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CardFields;
