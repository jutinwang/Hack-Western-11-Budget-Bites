import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeometricBackground } from "../shared/GeometricBackground";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <GeometricBackground />

      <Card className="w-full max-w-[768px] p-12 space-y-10 bg-white/95 backdrop-blur-xl border-2 shadow-2xl relative z-10 hover:shadow-3xl transition-all duration-300">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#df591f] to-[#45bed4] opacity-20 rounded-full blur-xl animate-pulse" />
              <img
                src="/logo.png"
                alt="Budget Bites"
                className="relative w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight gradient-text">
            Welcome to Budget Bites
          </h1>
          <p className="text-muted-foreground">
            Find delicious recipes within your budget
          </p>
        </div>

        <Button
          onClick={() => loginWithRedirect()}
          className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#df591f] to-[#45bed4] hover:scale-[1.02]"
        >
          Log In to Get Started
        </Button>
      </Card>
    </div>
  );
}
