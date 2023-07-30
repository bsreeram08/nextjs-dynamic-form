"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import AskQuestion from "./question";
import { FormIDs, QuestionTypes, TQuestionsForm, useZodForm } from "../schema";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Accordion } from "@/components/ui/accordion";
import { FieldErrors } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  formTitle: z.string().min(10, {
    message: "Title must be at least of 10 characters.",
  }),
  questions: z
    .array(
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
    )
    .min(1, {
      message: "You need to add at least one question.",
    }),
});

export default function NewForm() {
  const [questions, setQuestions] = useState<Array<number>>([]);
  const { toast } = useToast();

  const formKeys = FormIDs;

  const zodForm = useZodForm({
    schema: formSchema,
    defaultValues: {
      formTitle: "",
      questions: [],
    },
    mode: "onChange",
  });

  async function onValidSubmit(values: TQuestionsForm) {
    console.log("Valid Submit");
  }

  async function onInValidSubmit(values: FieldErrors<TQuestionsForm>) {
    console.log("Invalid Submit");
    console.log(values);
    const errors: Array<string> = [];
    function addError(message: string) {
      errors.push(message);
    }
    values.formTitle?.message ? addError(values.formTitle.message) : null;
    values.questions?.message ? addError(values.questions.message) : null;
    toast({
      title: "Uh oh!, you have to take care of these things first.",
      description: errors.join(" "),
      variant: "destructive",
    });
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-3/4">
        <Form {...zodForm}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={zodForm.handleSubmit(onValidSubmit, onInValidSubmit)}
          >
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
                            placeholder="What is your form called?"
                            className="w-full"
                            id={formKeys.formTitleId}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
              </CardContent>
            </Card>

            <br />
            <Accordion type="single" collapsible>
              {questions.map((_, index) => {
                const qNo = index + 1;
                return (
                  <>
                    <AskQuestion
                      qNo={qNo}
                      key={`${formKeys.getIdAtIndex(index)}-aq`}
                      id={formKeys.getIdAtIndex(index)}
                      zodForm={zodForm}
                      open={qNo === questions.length}
                    />
                    <br />
                  </>
                );
              })}
            </Accordion>
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
                      prevQuestions.length,
                    ]);
                  }}
                >
                  Add another question
                </Button>
              }
              <br />
              <Button className="flex-0 w-1/2" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
}
