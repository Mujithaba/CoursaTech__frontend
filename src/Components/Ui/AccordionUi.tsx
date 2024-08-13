import { Accordion, AccordionItem } from "@nextui-org/react";
import { Modules } from "../../services/types";
import { FaFilePdf } from "react-icons/fa";


interface AccordionProps {
  modules: any;
}

export default function AccordionUi({ modules }: AccordionProps) {
  return (
    <Accordion variant="splitted">
      {modules.map((module: any) => (
        // module iteration
        <AccordionItem
          key={module._id}
          aria-label={module.name}
          title={
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              {module.name}
            </span>
          }
        >
          <Accordion variant="bordered">
            {module.lectures.map((lecture: any) => (
              // lecture iteration
              <AccordionItem
                key={lecture._id}
                aria-label={lecture.title}
                title={
                  <span className=" font-mono font-semibold ms-7">
                    {lecture.title}
                  </span>
                }
              >
                <div className="border-2 rounded border-black p-2">
                  <p className="bg-card flex p-1 rounded-md font-serif">
                    <span className="font-semibold text-sm">Description:</span>
                    <br />
                    {lecture.description}
                  </p>
                  <hr className="m-2" />
                  <div className="flex flex-col md:flex-row w-full gap-4">
                    {lecture.lectureVideo && (
                      <div className="w-full md:w-1/2">
                        <h3 className="text-sm font-mono font-semibold mb-2">
                          Video
                        </h3>
                        {/* <video 
                      className="w-full" 
                      controls
                      src={lecture.lectureVideo}
                    > */}
                        <video
                          src={lecture.lectureVideo}
                          controls
                          className="mt-2 w-full h-32 object-cover border border-gray-300 rounded-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {lecture.lecturePdf && (
                      <div className="w-full md:w-1/2">
                        <div className="flex mb-2">
                        <h3 className="text-sm font-mono font-semibold mb-2">
                        </h3>
                          PDF:- <a
                            href={lecture.lecturePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ms-1 text-green-800 bg-gray-300 flex  items-center text-xs   px-1 py-1 rounded-lg shadow hover:bg-card"
                          >
                           <FaFilePdf /> View 
                          </a>
                          </div>
                        <iframe
                          src={lecture.lecturePdf}
                          className="mt-2 w-full h-32 border border-gray-300 rounded-lg"
                          title="PDF Preview"
                        >
                          This browser does not support PDFs. Please download
                          the PDF to view it.
                        </iframe>
                        {/* <div className="mt-2 flex justify-end  gap-2">
                          <a
                            href={lecture.lecturePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 flex items-center text-xs  text-white px-1 py-1 rounded-lg shadow hover:bg-blue-600"
                          >
                           <FaFilePdf /> View 
                          </a>
                          <a
        href={lecture.lecturePdf}
        download
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
      >
        Download PDF
      </a>
                        </div> */}
                      </div>
                    )}

                    {/* {lecture.lecturePdf && (
                      <div className="w-full md:w-1/2">
                        <h3 className="text-sm font-mono font-semibold mb-2">
                          PDF
                        </h3>
                        <iframe
                          src={lecture.lecturePdf}
                          className="mt-2 w-full h-32 border border-gray-300 rounded-lg"
                          title="PDF Preview"
                        >
                          This browser does not support PDFs. Please download
                          the PDF to view it.
                        </iframe>
                      </div>
                    )} */}
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
