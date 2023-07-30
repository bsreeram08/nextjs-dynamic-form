import { zodResolver } from "@hookform/resolvers/zod";
import { generateID } from "@jetit/id";
import { UseFormProps, useForm } from "react-hook-form";
import { ZodString, z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const QuestionTypes = [
  "SMALL_TEXT",
  "LARGE_TEXT",
  "RADIO",
  "CHECK",
] as const;

export type TQuestionTypes = (typeof QuestionTypes)[number];
export const QuestionTypeTest = {
  CHECK: "Multiple choice question with multi-select.",
  LARGE_TEXT: "Long answer.",
  RADIO: "Multiple choice question with single-select.",
  SMALL_TEXT: "Short-hand answer.",
} satisfies { [K in TQuestionTypes]: string };
export type QuestionZodForm = UseFormReturn<
  {
    questions: {
      question: string;
      formType: TQuestionTypes;
      options?: string[] | undefined;
    }[];
    formTitle: string;
  },
  any,
  undefined
>;

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

export class FormIDs {
  static readonly questions: Array<string> = [];
  static readonly formTitleId: string = generateID("HEX", "FF");
  static readonly questionsIds = () => FormIDs.questions;
  static readonly getIdAtIndex = (index: number) => FormIDs.questions[index];
  static readonly addQuestion = () => {
    FormIDs.questions.push(generateID("HEX", "FE"));
    return FormIDs.questions[FormIDs.questions.length - 1];
  };
}
