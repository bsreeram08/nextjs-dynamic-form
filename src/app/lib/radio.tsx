"use client";

import {
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

export function RadioGroupForm({
  zodForm,
  qNo,
  id,
  updateSelect,
}: {
  zodForm: QuestionZodForm;
  qNo: number;
  id: string;
  updateSelect: (event: TQuestionTypes) => void;
}) {
  return (
    <div>
      <FormField
        {...zodForm.register(`questions.${qNo - 1}.formType`)}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Select the type of Answer this question requires.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(event: TQuestionTypes) => {
                  field.onChange(event);
                  updateSelect(event);
                }}
                defaultValue={QuestionTypes[0]}
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
