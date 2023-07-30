import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Radio({
  question,
  questionName,
  choices,
}: {
  question: string;
  questionName: string;
  choices: Array<TChoice>;
}) {
  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>{questionName}</CardTitle>
        </CardHeader>
        <CardContent>
          <h4>{question}</h4>
          <RadioGroup defaultValue="option-one">
            {choices.map((v) => {
              return (
                <div
                  className="flex items-center space-x-2"
                  id={v.answerId}
                  key={v.answerId}
                >
                  <RadioGroupItem value="option-one" id={v.answerId} />
                  <Label htmlFor="option-one">{v.answer}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
