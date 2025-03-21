import QuizClient from "../_component/QuizClient";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <QuizClient params={{ id: id }} />
    </>
  );
};

export default page;
