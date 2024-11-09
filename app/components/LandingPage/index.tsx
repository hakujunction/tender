import React from "react";
import { Button, Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import { SmileOutlined, ToolOutlined, SolutionOutlined, HeartOutlined, TeamOutlined, PieChartOutlined } from '@ant-design/icons';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="container mx-auto py-4 px-4">
        {/* First Block for Candidates */}
        <section className="mb-16">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient bg-clip-text text-green-400 bg-gradient-to-r from-green-400 to-blue-500">
              For Candidates🧑‍🎓: Unlock Your Career and Wellbeing Potential
            </h2>
          </motion.div>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-green-400">
                    <HeartOutlined className="mr-2 text-green-400" />
                    Prioritize Your Wellbeing
                  </h3>
                  <p className="text-lg mt-2">Understand what truly matters for your health and happiness.</p>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-green-400">
                    <ToolOutlined className="mr-2 text-green-400" />
                    Identify Your Key Skills
                  </h3>
                  <p className="text-lg mt-2">Highlight your hard skills to match with the best opportunities.</p>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-green-400">
                    <SolutionOutlined className="mr-2 text-green-400" />
                    Discover Tailored Job Opportunities
                  </h3>
                  <p className="text-lg mt-2">Get a curated list of jobs that align with your skills and wellness goals.</p>
                </Card>
              </motion.div>
            </Col>
          </Row>
          <div className="text-center mt-8">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.7,
              }}
              className="inline-block"
            >
              <Button
                type="primary"
                size="large"
                href="/candidate"
                className="bg-green-400 hover:bg-green-500 text-black transition duration-300 w-full sm:w-auto text-lg py-4 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 glow-effect"
              >
                Create Your Profile Today and Start Your Journey  🚀 🚀 🚀
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Second Block for Companies */}
        <section>
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient bg-clip-text text-blue-400 bg-gradient-to-r from-blue-400 to-purple-600">
              For Companies 💼: Enhance Your Organization's Wellbeing Culture
            </h2>
          </motion.div>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-blue-400">
                    <HeartOutlined className="mr-2 text-blue-400" />
                    Strengthen Your Company’s Wellbeing
                  </h3>
                  <p className="text-lg mt-2">Cultivate a culture that promotes employee health and happiness.</p>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-blue-400">
                    <TeamOutlined className="mr-2 text-blue-400" />
                    Develop Your Wellbeing Initiatives
                  </h3>
                  <p className="text-lg mt-2">Deepen your commitment to wellness across your organization.</p>
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold text-blue-400">
                    <PieChartOutlined className="mr-2 text-blue-400" />
                    Analyze Your Organization’s Needs
                  </h3>
                  <p className="text-lg mt-2">Gain valuable insights into your team’s wellbeing priorities.</p>
                </Card>
              </motion.div>
            </Col>
          </Row>
          <div className="text-center mt-8">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.7,
              }}
              className="inline-block"
            >
              <Button
                type="primary"
                size="large"
                href="/company"
                className="bg-blue-400 hover:bg-blue-500 text-black transition duration-300 w-full sm:w-auto text-lg py-4 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 glow-effect"
              >
                Try the Demo Now 🎉 🎉 🎉
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
