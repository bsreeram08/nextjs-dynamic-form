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
  TFormSubmit,
  TQuestionZodForm,
  createQuestionForm,
  titleForm,
  useGetZodForm,
  useZodForm,
} from "./schema";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewForm() {
  const form = (val: number) =>
    useGetZodForm(createQuestionForm(`questions${val}`));
  const [questions, setQuestions] = useState<Array<TQuestionZodForm>>([
    form(1),
  ]);

  const titleZodForm = useZodForm({
    schema: titleForm,
    defaultValues: {
      formTitle: "",
    },
    mode: "onChange",
  });

  function onTitleSubmit(values: TFormSubmit) {
    titleZodForm.handleSubmit((value) => {
      console.log(value);
    });
  }
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-3/4">
        <Form {...titleZodForm}>
          <Card>
            <CardHeader>
              <CardTitle>Form Title</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                name={"formTitle"}
                control={titleZodForm.control}
                render={({ field }) => {
                  return (
                    <FormItem className="font-bold">
                      <FormControl>
                        <Input
                          placeholder="Title goes here...."
                          {...field}
                          className="w-full"
                          id="formTitle"
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
            return (
              <>
                <AskQuestion
                  qNo={qNo}
                  questionName={`questions${qNo}`}
                  key={qNo}
                  qf={questions[index]}
                />
                <br />
              </>
            );
          })}
          <form
            onSubmit={() => {
              titleZodForm.handleSubmit(onTitleSubmit);
              // questionsZodForm.handleSubmit(onQuestionsSubmit);
            }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center">
              {
                <Button
                  variant="secondary"
                  className="w-1/2"
                  onClick={(event) => {
                    event.preventDefault();
                    setQuestions((prevQuestions) => [
                      ...prevQuestions,
                      form(prevQuestions.length),
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
    </div>
  );
}
