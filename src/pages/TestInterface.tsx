import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { TestData } from "@/lib/testData";

interface TestInterfaceProps {
  testData: TestData;
  testType: "kids" | "adults";
  userId: string;
  onBackToSelection: () => void;
}

const TestInterface = ({
  testData,
  testType,
  userId,
  onBackToSelection,
}: TestInterfaceProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    let score = 0;
    let total = 0;

    testData.sections.forEach((section) => {
      section.questions.forEach((q) => {
        total++;
        if (answers[q.id] === q.correctAnswer) {
          score++;
        }
      });
    });

    try {
      await addDoc(collection(db, "testResults"), {
        userId,
        testType,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        answers,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Firestore write failed:", error);
      alert("Failed to save test result");
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Test Submitted 🎉</h2>
        <NeumorphicButton onClick={onBackToSelection}>
          Back to Tests
        </NeumorphicButton>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">{testData.title}</h2>
      <p className="text-muted-foreground">{testData.description}</p>

      {testData.sections.map((section) => (
        <div key={section.title} className="space-y-6">
          <h3 className="text-xl font-semibold">{section.title}</h3>

          {section.questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <p className="font-medium">{q.question}</p>

              {q.options.map((opt, idx) => {
                const letter = String.fromCharCode(97 + idx); // a, b, c, d

                return (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === letter}
                      onChange={() =>
                        setAnswers({ ...answers, [q.id]: letter })
                      }
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      <NeumorphicButton onClick={handleSubmit}>
        Submit Test
      </NeumorphicButton>
    </div>
  );
};

export default TestInterface;
