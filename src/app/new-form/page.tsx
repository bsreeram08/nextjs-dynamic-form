"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import AskQuestion from "./question";
import {
  FormIDs,
  QuestionTypes,
  TFormSubmit,
  TQuestionFormSchema,
  createQuestionForm,
  useZodForm,
} from "../schema";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

export const formSchema = z.object({
  formTitle: z.string().min(10, {
    message: "Title must be at least of 10 characters.",
  }),
  questions: z.array(
    z.object({
      question: z.string().min(10, {
        message: "Question should at least be of 10 characters.",
      }),
      formType: z.enum(QuestionTypes),
      options: z.optional(
        z.array(
          z.string().min(10, {
            message: "Options should at least be of 10 characters.",
          })
        )
      ),
    })
  ),
});

export default function NewForm() {
  const [questions, setQuestions] = useState<Array<TQuestionFormSchema>>([]);

  const formKeys = FormIDs;

  const zodForm = useZodForm({
    schema: formSchema,
    defaultValues: {
      formTitle: "",
      questions: [],
    },
    mode: "onChange",
  });

  function onTitleSubmit(values: TFormSubmit) {
    console.log(values);
    zodForm.handleSubmit((value) => {
      console.log(value);
    });
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-3/4">
        <Form {...zodForm}>
          <Card>
            <CardHeader>
              <CardTitle>Form Title</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                {...zodForm.register("formTitle")}
                render={({ field }) => {
                  return (
                    <FormItem className="font-bold">
                      <FormControl>
                        <Input
                          placeholder="Title goes here...."
                          {...field}
                          className="w-full"
                          id={formKeys.formTitleId}
                        />
                      </FormControl>
                      <FormDescription>
                        What is your form called?.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </CardContent>
          </Card>

          <br />
          {questions.map((_, index) => {
            const qNo = index + 1;
            const questionName = `questions${qNo}` as const;
            return (
              <>
                <AskQuestion
                  qNo={qNo}
                  key={`${formKeys.getIdAtIndex(index)}-aq`}
                  id={formKeys.getIdAtIndex(index)}
                  zodForm={zodForm}
                />
                <br />
              </>
            );
          })}

          <div className="flex flex-col items-center">
            {
              <Button
                variant="secondary"
                className="w-1/2"
                onClick={(event) => {
                  event.preventDefault();
                  formKeys.addQuestion();
                  setQuestions((prevQuestions) => [
                    ...prevQuestions,
                    createQuestionForm(`questions${prevQuestions.length}`),
                  ]);
                }}
              >
                Add another question
              </Button>
            }
            <br />
            <Button
              className="flex-0 w-1/2"
              onClick={(event) => {
                event.preventDefault();
                zodForm.handleSubmit(onTitleSubmit);
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
