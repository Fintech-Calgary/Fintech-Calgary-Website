"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Events from "@/components/Events";
import { useEffect, useCallback } from "react";
import Members from "@/components/Members";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#6d28d9", // Purple color matching your theme
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6d28d9",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
      },
    },
    retina_detect: true,
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-background">
      <Particles
        className="absolute inset-0"
        init={particlesInit}
        options={particlesConfig}
      />

      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-8 max-w-7xl relative"
      >
        {/* Welcome section with enhanced animation */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="relative overflow-hidden rounded-2xl mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500/30 to-primary/10 animate-gradient-x rounded-2xl" />
          <div className="relative bg-gray-900/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm"
              >
                Your Workspace
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  Welcome back
                  <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    {session?.user?.email?.split("@")[0]
                      ? ` ${session.user.email.split("@")[0]}`
                      : ""}
                  </span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Track your events and collaborate with your team members
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced content grid with wider cards */}
        <div className="grid grid-cols-1 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div
              className="relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 
                            transition-all duration-300 hover:bg-gray-900/70 hover:shadow-xl hover:shadow-primary/10
                            hover:border-white/20 overflow-hidden"
              id="events"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-white">Events</h2>
                  <p className="text-sm text-gray-400">Manage your schedule</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-sm">
                  <ChartBarIcon className="h-6 w-6" />
                </span>
              </div>
              <Events />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <div
              className="relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 
                            transition-all duration-300 hover:bg-gray-900/70 hover:shadow-xl hover:shadow-primary/10
                            hover:border-white/20 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2
                    className="text-2xl font-semibold text-white"
                    id="members"
                  >
                    Team
                  </h2>
                  <p className="text-sm text-gray-400">
                    Collaborate with others
                  </p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-sm">
                  <UserGroupIcon className="h-6 w-6" />
                </span>
              </div>
              <Members />
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
}
