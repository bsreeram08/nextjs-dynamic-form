import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useForm } from "react-hook-form";
import { ZodString, z } from "zod";

export const questionSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(15, {
        message: "Question must contain at least of 15 characters..",
      }),
    })
  ),
});

export const titleForm = z.object({
  formTitle: z.string().min(10, {
    message: "Title must be at least of 10 characters.",
  }),
});
export type TQuestionSchema = z.infer<
  typeof questionSchema
>["questions"][number];

export type TFormSubmit = {
  formTitle: string;
};

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      raw: true,
    }),
  });

  return form;
}

export type TQuestionFormSchema = ReturnType<typeof createQuestionForm>;
export function createQuestionForm<TQuestion extends `questions${number}`>(
  question: TQuestion
) {
  const obj: Map<TQuestion, ZodString> = new Map();
  obj.set(
    question,
    z.string().min(15, {
      message: "Question must contain at least of 15 characters..",
    })
  );
  return z.object(Object.fromEntries(obj) as Record<TQuestion, ZodString>);
}

export type TQuestionZodForm = ReturnType<typeof useGetZodForm>;
export function useGetZodForm(questionForm: TQuestionFormSchema) {
  return useZodForm({
    schema: questionForm,
    mode: "onChange",
  });
}
