import AccordionCommon from "../../Ui/tutorUi/AccordionCommon";
import { Modules } from "../../../services/types";

interface CurriculumDataProps {
  modules: Modules[] | undefined;
}

export default function CommonCuricculumA({ modules }: CurriculumDataProps) {
  return (
    <div>
      {modules && modules.length > 0 ? (
        <div className="mt-3 mx-2 bg-card p-3 rounded-md">
          <AccordionCommon modules={modules} />
        </div>
      ) : (
        <div className="text-center bg-card py-7 rounded-md text-gray-600 mt-4 font-bold font-mono">
          No modules are available now.
        </div>
      )}
    </div>
  );
}
