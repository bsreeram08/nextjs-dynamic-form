"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroupForm } from "../lib/radio";
import { QuestionZodForm, TQuestionTypes } from "../schema";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AskQuestion({
  qNo,
  id,
  zodForm,
  open,
}: {
  qNo: number;
  id: string;
  zodForm: QuestionZodForm;
  open: boolean;
}) {
  const [question, setQuestion] = useState<string>("");
  const [formType, setFormType] = useState<TQuestionTypes>("SMALL_TEXT");
  return (
    <div id={`${id}-div`}>
      <Card>
        <AccordionItem
          value={`question-${qNo - 1}-accordion-item`}
          className="px-4"
        >
          <AccordionTrigger>
            <CardHeader>
              <CardTitle>
                {question == "" ? `Question ${qNo}` : question}
              </CardTitle>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              <FormField
                {...zodForm.register(`questions.${qNo - 1}.question`)}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="question goes here...."
                          id={`${id}-input`}
                          {...field}
                          onChange={(event) => {
                            event.preventDefault();
                            field.onChange(event.target.value);
                            setQuestion(event.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        <RadioGroupForm
                          zodForm={zodForm}
                          key={`${id}-options`}
                          qNo={qNo}
                          updateSelect={(value: TQuestionTypes) => {
                            setFormType(value);
                          }}
                          id={id}
                        />
                        <SubQuestion
                          type={formType}
                          id={id}
                          qNo={qNo}
                          zodForm={zodForm}
                        />
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </div>
  );
}

function SubQuestion({
  type,
  qNo,
  id,
  zodForm,
}: {
  type: TQuestionTypes;
  qNo: number;
  id: string;
  zodForm: QuestionZodForm;
}) {
  const subQuestionTypes: Array<TQuestionTypes> = ["CHECK", "RADIO"];
  const [subQuestions, setSubQuestions] = useState<Array<string>>([""]);
  if (!subQuestionTypes.includes(type)) return <div></div>;
  else
    return (
      <div>
        <br />
        {subQuestions.map((_, index) => {
          return (
            <div key={`${id}-question-${type}-${index}-key`}>
              <FormField
                {...zodForm.register(`questions.${qNo - 1}.options.${index}`)}
                render={({ field }) => {
                  return (
                    <FormItem className="font-bold">
                      <FormControl>
                        <Input
                          placeholder={`Option - ${index + 1}`}
                          className="w-full"
                          id={`${id}-questions-${type}-option-${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
          );
        })}
        <br />
        <Button
          variant="secondary"
          className="w-1/2"
          onClick={(event) => {
            event.preventDefault();
            setSubQuestions([...subQuestions, ""]);
          }}
        >
          Add another option.
        </Button>
      </div>
    );
}
