import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { BookOpen, GraduationCap } from "lucide-react";
import TestInterface from "@/components/TestInterface";
import { kidsTestData, adultsTestData } from "@/lib/testData";
import { TestData } from "@/lib/testData";

type TestType = "kids" | "adults" | null;

/* ---------- FLATTEN QUESTIONS ---------- */
const flattenQuestions = (testData: TestData) =>
  testData.sections.flatMap((section) => section.questions);

const Tests = () => {
  const [selectedTest, setSelectedTest] = useState<TestType>(null);

  /* ---------- AUTH ---------- */
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  /* ---------- FORM ---------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* ---------- FORCE LOGIN EVERY VISIT ---------- */
  useEffect(() => {
    const init = async () => {
      await signOut(auth);
      setUser(null);
      setAuthLoading(false);
    };
    init();
  }, []);

  /* ---------- LOGIN / REGISTER ---------- */
  const handleAuth = async () => {
    setError("");
    setLoginLoading(true);

    try {
      const cred = isRegister
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      setUser(cred.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ---------- TEST SCREEN ---------- */
  if (selectedTest && user) {
    const testData =
      selectedTest === "kids" ? kidsTestData : adultsTestData;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <Navbar />
        <div className="pt-24 pb-12 container mx-auto px-4">
         <TestInterface
  testData={selectedTest === "kids" ? kidsTestData : adultsTestData}
  userId={user.uid}
  onBackToSelection={() => setSelectedTest(null)}
/>

        </div>
        <Footer />
      </div>
    );
  }

  /* ---------- MAIN PAGE ---------- */
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
        <Navbar />

        <main className="pt-28 pb-20 container mx-auto px-4">
          {/* HEADER */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Grammar Assessment Tests
            </h1>
            <p className="text-muted-foreground mt-4">
              Login or register to take the test and save your score
            </p>
          </motion.div>

          {/* AUTH */}
          {!user && !authLoading && (
            <div className="max-w-md mx-auto mb-14">
              <NeumorphicCard>
                <div className="p-8 space-y-4">
                  <h2 className="text-2xl font-bold text-center">
                    {isRegister ? "Create Account" : "Login"}
                  </h2>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl bg-background shadow-neu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl bg-background shadow-neu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <NeumorphicButton
                    className="w-full"
                    onClick={handleAuth}
                    disabled={loginLoading}
                  >
                    {loginLoading
                      ? "Please wait..."
                      : isRegister
                      ? "Register"
                      : "Login"}
                  </NeumorphicButton>

                  <p className="text-sm text-center text-muted-foreground">
                    {isRegister ? "Already have an account?" : "New user?"}{" "}
                    <button
                      className="text-primary underline"
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister ? "Login" : "Register"}
                    </button>
                  </p>
                </div>
              </NeumorphicCard>
            </div>
          )}

          {/* TEST SELECTION */}
          {user && (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <NeumorphicCard>
                <div className="p-8 space-y-6">
                  <BookOpen className="w-10 h-10 text-primary" />
                  <h2 className="text-2xl font-bold">Kids Grammar Test</h2>
                  <NeumorphicButton
                    className="w-full"
                    onClick={() => setSelectedTest("kids")}
                  >
                    Start Test
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>

              <NeumorphicCard>
                <div className="p-8 space-y-6">
                  <GraduationCap className="w-10 h-10 text-accent" />
                  <h2 className="text-2xl font-bold">
                    Advanced Grammar Test
                  </h2>
                  <NeumorphicButton
                    className="w-full"
                    onClick={() => setSelectedTest("adults")}
                  >
                    Start Test
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tests;
