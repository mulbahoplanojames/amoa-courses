import Survey from "@/model/Survey";
import connectToDatabase from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectToDatabase();

  const {
    name,
    email,
    age,
    phone,
    department,
    educationLevel,
    coursesInterested,
    experienceLevel,
    learningStyle,
    reasonForJoining,
    goals,
    heardFrom,
    additionalComments,
    termsAccepted,
  } = await request.json();

  try {
    const survey = new Survey({
      name,
      email,
      age,
      phone,
      department,
      educationLevel,
      coursesInterested,
      experienceLevel,
      learningStyle,
      reasonForJoining,
      goals,
      heardFrom,
      additionalComments,
      termsAccepted,
    });
    await survey.save();
    return NextResponse.json(
      { message: "Survey submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json(
      { error: "Failed to submit survey" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const surveys = await Survey.find();
  return NextResponse.json({ surveys }, { status: 200 });
}
