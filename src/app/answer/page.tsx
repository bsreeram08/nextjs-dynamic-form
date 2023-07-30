"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Radio from "./radio";

export default function Home() {
  return (
    <div className="grid h-full w-full place-items-center">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Hello</CardTitle>
        </CardHeader>
        <CardContent>
          <h4>Hello World</h4>
          <Radio
            choices={[
              { answer: "I am fine", answerId: "iamfine" },
              { answer: "I am horrible", answerId: "iamhorrible" },
            ]}
            question="How are yoy?"
            questionName="q1"
            key={"hellooooooooo"}
          ></Radio>
        </CardContent>
      </Card>
    </div>
  );
}
