"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  QuestionTypeTest,
  QuestionTypes,
  QuestionZodForm,
  TQuestionTypes,
} from "../schema";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

export function RadioGroupForm({
  zodForm,
  qNo,
  id,
}: {
  zodForm: QuestionZodForm;
  qNo: number;
  id: string;
}) {
  return (
    <div>
      <FormField
        {...zodForm.register(`questions.${qNo}.formType`)}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Select the type of Answer this question requires.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {QuestionTypes.map((_, index) => {
                  return (
                    <div key={`${id}-radio-options-${index}`}>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={_} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {QuestionTypeTest[_]}
                        </FormLabel>
                      </FormItem>
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
