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
import { RadioGroupForm } from "../_lib/radio";
import { QuestionZodForm } from "../schema";

export default function AskQuestion({
  qNo,
  id,
  zodForm,
}: {
  qNo: number;
  id: string;
  zodForm: QuestionZodForm;
}) {
  return (
    <div id={`${id}-div`}>
      <Card>
        <CardHeader>
          <CardTitle>Question {qNo}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            {...zodForm.register(`questions.${qNo}.question`)}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="question goes here...."
                      id={id}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <RadioGroupForm
                      zodForm={zodForm}
                      key={`${id}-options`}
                      qNo={qNo}
                      id={id}
                    />
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
