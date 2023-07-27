import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { CustomFormData } from "./types";

export default function AskQuestion({
  qNo,
  questionName,
  questionFormControl,
}: {
  qNo: number;
  questionName: string;
  questionFormControl: Control<CustomFormData, any>;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Question {qNo}</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            control={questionFormControl}
            name={questionName}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="question goes here...." {...field} />
                  </FormControl>
                  <FormDescription>
                    Select the type of Answer this question requires.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></Controller>
        </CardContent>
      </Card>
    </div>
  );
}
