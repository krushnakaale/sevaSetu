import React from "react";
import Hero from "./Hero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
