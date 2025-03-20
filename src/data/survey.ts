export const courses = [
  { id: "web-dev", label: "Advanced Web Development" },
  { id: "Backend Dev", label: "Backend Development" },
  { id: "Python Dev", label: "Python Developer" },
  { id: "ui-ux", label: "UI/UX Design Principles" },
  { id: "frontend-dev", label: "Front-End Developer" },
  { id: "backend-dev", label: "Back-End Developer" },
  { id: "network", label: "Network Engineer" },
  { id: "data-science", label: "Data Science Fundamentals" },
  { id: "graphic-design", label: "Graphic Designer" },
];

export const steps = [
  {
    id: "personal",
    name: "Personal Information",
    fields: ["name", "email", "age", "phone"],
  },
  {
    id: "education",
    name: "Educational Background",
    fields: ["department", "educationLevel"],
  },
  {
    id: "courses",
    name: "Course Interests",
    fields: ["coursesInterested"],
  },
  {
    id: "experience",
    name: "Experience & Preferences",
    fields: ["experienceLevel", "learningStyle"],
  },
  {
    id: "goals",
    name: "Goals & Motivations",
    fields: ["reasonForJoining", "goals"],
  },
  {
    id: "additional",
    name: "Additional Information",
    fields: ["heardFrom", "additionalComments", "termsAccepted"],
  },
];
