import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be at least 2 characters."],
      minlength: [2, "Name must be at least 2 characters."],
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email address."],
      validate: {
        validator: (v: string) => {
          const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address.`,
      },
    },
    age: {
      type: Number,
      optional: true,
    },
    phone: {
      type: String,
      optional: true,
    },
    department: {
      type: String,
      required: [true, "Please select a department."],
    },
    educationLevel: {
      type: String,
      required: [true, "Please select your education level."],
    },
    coursesInterested: {
      type: [String],
      required: [true, "Please select at least one course."],
      min: [1, "Please select at least one course."],
    },
    experienceLevel: {
      type: String,
      required: [true, "Please select your experience level."],
    },
    learningStyle: {
      type: String,
      required: [true, "Please select your preferred learning style."],
    },
    reasonForJoining: {
      type: String,
      required: [true, "Please provide a reason with at least 10 characters."],
      minlength: [10, "Please provide a reason with at least 10 characters."],
    },
    goals: {
      type: String,
      required: [
        true,
        "Please describe your goals with at least 10 characters.",
      ],
      minlength: [
        10,
        "Please describe your goals with at least 10 characters.",
      ],
    },
    heardFrom: {
      type: String,
      required: [true, "Please tell us how you heard about us."],
    },
    additionalComments: {
      type: String,
      optional: true,
    },
    termsAccepted: {
      type: Boolean,
      required: [true, "You must accept the terms and conditions."],
      default: false,
      validate: {
        validator: (v: boolean) => v === true,
        message: "You must accept the terms and conditions.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);

export default Survey;
