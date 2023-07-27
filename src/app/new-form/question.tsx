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
import { TQuestionFormSchema, useZodForm } from "./schema";
import { UseFormReturn } from "react-hook-form";

export default function AskQuestion({
  qNo,
  questionName,
  qf,
}: {
  qNo: number;
  questionName: `questions${number}`;
  qf: UseFormReturn<
    {
      [x: `questions${number}`]: string;
    },
    any,
    undefined
  >;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Question {qNo}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={qf.control}
            name={questionName}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="question goes here...."
                      {...field}
                      id={`question${qNo}`}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the type of Answer this question requires.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
        </CardContent>
      </Card>
    </div>
  );
}
