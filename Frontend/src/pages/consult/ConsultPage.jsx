import ConsultHero from "./ConsultHero";
import DoctorFilter from "./DoctorFilter";
import DoctorList from "./DoctorList";
import AppointmentModal from "./AppointmentModal";
import ChatOrVideoCall from "./ChatOrVideoCall";
import { useState } from "react";
import React from "react";
export default function ConsultPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div>
      <ConsultHero />
      <DoctorFilter />
      <DoctorList />

      {selectedDoctor && (
        <>
          <AppointmentModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
          <ChatOrVideoCall doctor={selectedDoctor} />
        </>
      )}
    </div>
  );
}
