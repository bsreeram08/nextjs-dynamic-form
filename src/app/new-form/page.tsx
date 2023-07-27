"use client";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import AskQuestion from "./question";
import { CustomFormData } from "./types";

export default function NewForm() {
  const [questions, setQuestions] = useState<Array<number>>([0, 0, 0]);
  const questionSchemas = questions.map((qNo) =>
    z.object({
      [`question${qNo}`]: z.string().min(15, {
        message: `Question ${qNo} must contain at least 15 characters.`,
      }),
    })
  );
  const schema = z.object(Object.assign({}, ...questionSchemas));
  const form = useForm<CustomFormData>({
    resolver: zodResolver(schema),
  });
  function onSubmit(values: CustomFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-3/4">
        <Form {...form}>
          {questions.map((_, index) => {
            const qNo = index + 1;
            return (
              <>
                <AskQuestion
                  qNo={qNo}
                  questionName={`question${qNo}`}
                  questionFormControl={form.control}
                  key={qNo}
                />
                <br />
              </>
            );
          })}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-1/2"
                onClick={(event) => {
                  event.preventDefault();
                  setQuestions((prevQuestions) => [...prevQuestions, 0]);
                }}
              >
                Add another question
              </Button>
              <br />
              <Button className="flex-0 w-1/2" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
