"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronRight, ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { courses, steps } from "@/data/survey";
import axios from "axios";
import { toast } from "react-hot-toast";
import { surveyFormSchema } from "@/Schema/zodSchema";

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof surveyFormSchema>>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      phone: "",
      coursesInterested: [],
      reasonForJoining: "",
      goals: "",
      additionalComments: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof surveyFormSchema>) {
    setIsSubmitting(true);

    // Destructuring all form values
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
    } = values;

    // console.log("Submission Data", values);

    try {
      const response = await axios.post("/api/survey", {
        name,
        email,
        age: age || undefined,
        phone: phone || undefined,
        department,
        educationLevel,
        coursesInterested,
        experienceLevel,
        learningStyle,
        reasonForJoining,
        goals,
        heardFrom,
        additionalComments: additionalComments || undefined,
        termsAccepted,
      });

      const data = await response.data;
      console.log("Submission successful:", data);

      if (response.status === 201 || response.status === 200) {
        toast.success("Survey submitted successfully!");
      } else {
        toast.error("Your survey Submission failed!");
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      form.reset();
    } catch (error) {
      console.error("Error submitting survey:", error);
      setIsSubmitting(false);
      toast.error("Your survey Submission failed!");
    }
  }

  // Check if the current step is valid
  const validateStep = async () => {
    const fields = steps[currentStep].fields;
    const result = await form.trigger(
      fields as (keyof z.infer<typeof surveyFormSchema>)[]
    );
    return result;
  };

  // Go to the next step
  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo(0, 0);
    }
  };

  // Go to the previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  // Handle final submission
  const handleSubmit = async () => {
    const isValid = await validateStep();
    if (isValid) {
      form.handleSubmit(onSubmit)();
    }
  };

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto px-4 pb-12 pt-32 ">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Interest Survey</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Help us understand your learning goals and preferences so we can
            provide the best experience.
          </p>

          {!isSuccess && (
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{steps[currentStep].name}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {isSuccess ? (
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-2xl">Survey Submitted!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for your interest in our courses
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">
                We&apos;ve received your information and will review it shortly.
                One of our education advisors will contact you within 2 business
                days to discuss your learning journey.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/courses")}
                >
                  Back to Courses
                </Button>
                <Button onClick={() => (window.location.href = "/")}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].name}</CardTitle>
              <CardDescription>
                {currentStep === 0 &&
                  "Please provide your basic contact information."}
                {currentStep === 1 &&
                  "Tell us about your educational background."}
                {currentStep === 2 &&
                  "Select the courses you're interested in taking."}
                {currentStep === 3 &&
                  "Help us understand your experience level and learning preferences."}
                {currentStep === 4 &&
                  "Share your goals and motivations for taking these courses."}
                {currentStep === 5 &&
                  "Just a few more details before we finish."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john.doe@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="25" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Educational Background */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department/Field</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="w-full">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your field" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="computer-science">
                                    Software Development
                                  </SelectItem>
                                  <SelectItem value="design">Design</SelectItem>
                                  <SelectItem value="information-technology">
                                    Networking
                                  </SelectItem>
                                  <SelectItem value="engineering">
                                    Data Science
                                  </SelectItem>
                                  <SelectItem value="business">
                                    Business
                                  </SelectItem>
                                  <SelectItem value="business">
                                    Information Technology
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Education Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className="w-full">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your education level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="high-school">
                                    High School
                                  </SelectItem>
                                  <SelectItem value="bachelors">
                                    Bachelor&apos;s Degree
                                  </SelectItem>
                                  <SelectItem value="associate">
                                    Associate Degree
                                  </SelectItem>
                                  <SelectItem value="self-taught">
                                    Self-taught
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Course Interests */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="coursesInterested"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Courses Interested In</FormLabel>
                              <FormDescription>
                                Select all courses you&apos;re interested in
                                learning.
                              </FormDescription>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2">
                              {courses.map((course) => (
                                <FormField
                                  key={course.id}
                                  control={form.control}
                                  name="coursesInterested"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={course.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              course.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    course.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== course.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {course.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Experience & Learning Preferences */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="pb-1 block">
                              Experience Level
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="beginner" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Beginner - Little to no experience
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="intermediate" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Intermediate - Some experience, looking to
                                    advance
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="advanced" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Advanced - Experienced, seeking specialized
                                    knowledge
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="learningStyle"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="pb-1 block">
                              Preferred Learning Style
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="visual" />
                                  </FormControl>
                                  <FormLabel className="font-normal ">
                                    Visual - Learn best through images,
                                    diagrams, and demonstrations
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="auditory" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Auditory - Learn best through lectures and
                                    discussions
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="reading-writing" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Reading/Writing - Learn best through reading
                                    materials and taking notes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="kinesthetic" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Kinesthetic - Learn best through hands-on
                                    activities and projects
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 5: Goals & Motivations */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="reasonForJoining"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="pb-1 block">
                              Reason for Joining
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What motivated you to pursue this course?"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="pb-1 block">
                              Learning Goals
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What specific skills or knowledge do you hope to gain?"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 6: Additional Information & Terms */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="heardFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="pb-1 block">
                              How did you hear about us?
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="search">
                                  Search Engine
                                </SelectItem>
                                <SelectItem value="social">
                                  Social Media
                                </SelectItem>
                                <SelectItem value="friend">
                                  Friend or Colleague
                                </SelectItem>
                                <SelectItem value="advertisement">
                                  Advertisement
                                </SelectItem>
                                <SelectItem value="event">
                                  Event or Conference
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalComments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="pb-1 block">
                              Additional Comments (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any other information you'd like to share with us?"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                        <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Your privacy is important to us. Well only use your
                            information to process your application and contact
                            you about our courses.
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the terms and conditions
                              </FormLabel>
                              <FormDescription>
                                By submitting this form, you agree to our{" "}
                                <a href="#" className="text-primary underline">
                                  Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary underline">
                                  Terms of Service
                                </a>
                                .
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Survey <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
