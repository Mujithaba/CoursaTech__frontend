import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaFilePdf, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

interface AccordionProps {
  modules: any;
  isPurchased?: boolean;
}

export default function AccordionUi({ modules, isPurchased }: AccordionProps) {
  return (
    <Accordion variant="splitted">
      {modules.map((module: any) => (
        <AccordionItem
          key={module._id}
          aria-label={module.name}
          title={
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-black text-lg font-bold"
            >
              {module.name}
            </motion.div>
          }
        >
          <Accordion variant="bordered">
            {module.lectures.map((lecture: any) => (
              <AccordionItem
                key={lecture._id}
                aria-label={lecture.title}
                title={
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center w-full"
                  >
                    <span className="font-mono font-semibold">
                      {lecture.title}
                    </span>
                    {!isPurchased && <FaLock className="text-gray-800" />}
                  </motion.div>
                }
              >
                {isPurchased ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-2 rounded border-black p-4"
                  >
                    <p className="bg-gray-100 p-2 rounded-md font-serif">
                      <span className="font-semibold text-sm">
                        Description:
                      </span>
                      <br />
                      {lecture.description}
                    </p>
                    <hr className="my-2" />
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      {lecture.lectureVideo && (
                        <div className="w-full md:w-1/2">
                          <h3 className="text-sm font-mono font-semibold mb-2">
                            Video
                          </h3>
                          <video
                            src={lecture.lectureVideo}
                            controls
                            controlsList="nodownload"
                            className="w-full h-56 object-cover border border-gray-300 rounded-md"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {lecture.lecturePdf && (
                        <div className="w-full md:w-1/2">
                          <div className="flex items-center mb-2">
                            <h3 className="text-sm font-mono font-semibold">
                              PDF:
                            </h3>
                            <a
                              href={lecture.lecturePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-green-800 bg-gray-300 flex items-center text-xs px-2 py-1 rounded-md shadow hover:bg-gray-200"
                            >
                              <FaFilePdf className="mr-1" /> View
                            </a>
                          </div>
                          <iframe
                            src={lecture.lecturePdf}
                            className="mt-2 w-full h-56 border border-gray-300 rounded-lg"
                            title="PDF Preview"
                          >
                            This browser does not support PDFs. Please download
                            the PDF to view it.
                          </iframe>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-4"
                  >
                    <p className="font-semibold text-gray-900">
                      This content is locked. Purchase the course to access it.
                    </p>
                  </motion.div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
