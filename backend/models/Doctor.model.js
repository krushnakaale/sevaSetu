const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: [true, "Please provide specialization"],
      enum: [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Gynecologist",
        "Orthopedic",
        "Neurologist",
        "Psychiatrist",
        "Dentist",
        "ENT Specialist",
        "Ophthalmologist",
        "Radiologist",
        "Surgeon",
        "Other",
      ],
    },
    qualifications: [
      {
        degree: String,
        institution: String,
        year: Number,
      },
    ],
    experience: {
      type: Number, // in years
      required: [true, "Please provide years of experience"],
    },
    registrationNumber: {
      type: String,
      required: [true, "Please provide medical registration number"],
      unique: true,
    },
    registrationCouncil: {
      type: String, // MCI, State Medical Council
      required: true,
    },
    clinicHospitalName: {
      type: String,
    },
    clinicAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    consultationFee: {
      type: Number,
      required: [true, "Please provide consultation fee"],
      default: 500,
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        slots: [
          {
            startTime: String, // "09:00"
            endTime: String, // "10:00"
            isBooked: { type: Boolean, default: false },
          },
        ],
      },
    ],
    languages: [String],
    about: {
      type: String,
      maxlength: 500,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalConsultations: {
      type: Number,
      default: 0,
    },
    // Verification Fields
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    documents: {
      medicalLicense: String, // URL
      degreeCertificate: String, // URL
      idProof: String, // URL
    },
    rejectionReason: {
      type: String,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who verified
    },
    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);
