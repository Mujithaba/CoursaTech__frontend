import React from 'react'
import { Modules } from '../../../services/types'
import AccordionUi from '../../Ui/AccordionUi'

interface CurriculumDataProps {
  modules: Modules[] | undefined;
  isPurchase: boolean;
}

export default function CuricculumsData({modules, isPurchase}: CurriculumDataProps) {
  
  return (
    <div>
      {modules && modules.length > 0 ? (
        <div className="mt-3 mx-2 bg-card p-3 rounded-md">
          <AccordionUi modules={modules} isPurchased={isPurchase} />
        </div>
      ) : (
        <div className="text-center bg-card py-7 rounded-md text-gray-600 mt-4 font-bold font-mono">
          No modules are available now.
        </div>
      )}
    </div>
  )
}