import React, { useMemo, useState } from "react";
import tree from "./tree/reflectionTree.json";

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState(tree.start);
  const [history, setHistory] = useState([tree.start]);
  const [answers, setAnswers] = useState([]);
  const [hovered, setHovered] = useState(null);

  const node = tree.nodes[currentNodeId];

  const questionIds = useMemo(
    () =>
      Object.keys(tree.nodes).filter(
        (id) => tree.nodes[id].type === "question",
      ),
    [],
  );

  const currentQuestionIndex = Math.max(
    questionIds.indexOf(currentNodeId) + 1,
    0,
  );
  const progress =
    node?.type === "question"
      ? (currentQuestionIndex / questionIds.length) * 100
      : 100;

  const goToNode = (id) => {
    if (!id) return;
    setCurrentNodeId(id);
    setHistory((prev) => [...prev, id]);
  };

  // Auto handle invisible nodes
  const autoAdvance = (nextId) => {
    setTimeout(() => goToNode(nextId), 900);
  };

  const handleStart = () => {
    goToNode(node.target);
  };

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    // if next is decision node, resolve route based on signal
    const nextNode = tree.nodes[option.target];

    if (nextNode?.type === "decision") {
      const routed = nextNode.routes?.[option.signal];
      goToNode(routed);
      return;
    }

    goToNode(option.target);
  };

  const handleContinue = () => {
    if (node.target) {
      goToNode(node.target);
    }
  };

  const handleBack = () => {
    if (history.length <= 1) return;

    const copy = [...history];
    copy.pop();

    setHistory(copy);
    setCurrentNodeId(copy[copy.length - 1]);

    if (answers.length) {
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentNodeId(tree.start);
    setHistory([tree.start]);
    setAnswers([]);
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.topBadge}>
            DT Fellowship • Deterministic Reflection Agent
          </div>
          <h1 style={styles.title}>The Daily Reflection Tree</h1>
          <p style={styles.subtitle}>Agency • Contribution • Stewardship</p>
        </div>

        {node.type === "start" && (
          <div style={styles.card}>
            <span style={styles.badge}>Begin Reflection</span>
            <h2 style={styles.heroTitle}>{node.text}</h2>
            <p style={styles.heroText}>
              Navigate a structured decision tree designed from behavioral
              frameworks.
            </p>

            <button onClick={handleStart} style={styles.primaryBtn}>
              Start Assessment →
            </button>
          </div>
        )}

        {node.type === "question" && (
          <div style={styles.card}>
            <div style={styles.topRow}>
              <span style={styles.axisTag}>{node.axis} Axis</span>
              <span style={styles.counter}>
                {currentQuestionIndex}/{questionIds.length}
              </span>
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${progress}%`,
                }}
              />
            </div>

            <div style={styles.label}>Reflection Prompt</div>
            <h2 style={styles.question}>{node.text}</h2>

            <div style={styles.optionGrid}>
              {node.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    ...styles.optionCard,
                    transform:
                      hovered === index ? "translateY(-6px)" : "translateY(0)",
                    boxShadow:
                      hovered === index
                        ? "0 18px 40px rgba(99,102,241,.35)"
                        : "none",
                  }}
                >
                  <div style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div>
                    <div style={styles.optionTitle}>{option.text}</div>
                    <div style={styles.optionSub}>Select to continue</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={styles.navRow}>
              <button
                onClick={handleBack}
                disabled={history.length < 3}
                style={{
                  ...styles.secondaryBtn,
                  opacity: history.length < 3 ? 0.4 : 1,
                }}
              >
                ← Back
              </button>

              <button onClick={restart} style={styles.ghostBtn}>
                Restart
              </button>
            </div>
          </div>
        )}

        {(node.type === "reflection" || node.type === "bridge") && (
          <div style={styles.card}>
            <span style={styles.badge}>
              {node.type === "bridge" ? "Transition" : "Reflection Insight"}
            </span>

            <h2 style={styles.heroTitle}>{node.text}</h2>

            <button onClick={handleContinue} style={styles.primaryBtn}>
              Continue →
            </button>
          </div>
        )}

        {(node.type === "summary" || node.type === "result") && (
          <div style={styles.resultCard}>
            <div style={styles.resultIcon}>✓</div>

            <span style={styles.badge}>Reflection Complete</span>

            <h2 style={styles.resultTitle}>{node.title}</h2>

            <p style={styles.resultText}>{node.text}</p>

            <div style={styles.pathBox}>
              <div style={styles.pathLabel}>Path Summary</div>
              <div style={styles.pathText}>{node.path}</div>
            </div>

            <div style={styles.practiceBox}>
              <h3 style={styles.practiceTitle}>Suggested Practices</h3>

              {node.practice?.map((item, i) => (
                <div key={i} style={styles.practiceItem}>
                  • {item}
                </div>
              ))}
            </div>

            <button onClick={restart} style={styles.primaryBtn}>
              Run Again
            </button>
          </div>
        )}

        {node.type === "end" && (
          <div style={styles.card}>
            <h2 style={styles.heroTitle}>{node.text}</h2>
            <button onClick={restart} style={styles.primaryBtn}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#081124,#0f1f49 55%,#091631)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    width: 500,
    height: 500,
    background: "#6366f122",
    filter: "blur(140px)",
    borderRadius: "50%",
    left: -120,
    top: -100,
  },

  glow2: {
    position: "absolute",
    width: 560,
    height: 560,
    background: "#8b5cf622",
    filter: "blur(150px)",
    borderRadius: "50%",
    right: -120,
    bottom: -180,
  },

  wrapper: {
    width: "100%",
    maxWidth: 1100,
    position: "relative",
    zIndex: 2,
  },

  header: {
    textAlign: "center",
    marginBottom: 35,
  },

  topBadge: {
    display: "inline-block",
    padding: "10px 18px",
    background: "rgba(99,102,241,.16)",
    borderRadius: 40,
    fontWeight: 700,
    color: "#c2caff",
    marginBottom: 18,
  },

  title: {
    fontSize: 56,
    fontWeight: 900,
    marginBottom: 10,
    color: "white",
  },

  subtitle: {
    fontSize: 22,
    color: "#a8b6e5",
  },

  card: {
    background: "rgba(20,31,65,.95)",
    padding: "60px",
    borderRadius: 30,
    boxShadow: "0 30px 80px rgba(0,0,0,.45)",
  },

  resultCard: {
    background: "rgba(17,28,58,.96)",
    padding: "70px",
    borderRadius: 32,
    textAlign: "center",
    boxShadow: "0 35px 90px rgba(0,0,0,.5)",
  },

  badge: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: 30,
    background: "#4f46e525",
    color: "#bdc8ff",
    fontWeight: 700,
    marginBottom: 25,
  },

  heroTitle: {
    fontSize: 46,
    fontWeight: 850,
    lineHeight: 1.3,
    color: "white",
    marginBottom: 30,
  },

  heroText: {
    fontSize: 22,
    lineHeight: 1.7,
    color: "#c5d1f7",
    marginBottom: 35,
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  axisTag: {
    padding: "10px 18px",
    background: "#6366f122",
    borderRadius: 30,
    fontWeight: 700,
    color: "#c2caff",
  },

  counter: {
    color: "#aab7e5",
    fontWeight: 700,
  },

  progressTrack: {
    height: 12,
    background: "#233761",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 35,
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    transition: "all .35s ease",
  },

  label: {
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#9fb0de",
    marginBottom: 14,
  },

  question: {
    fontSize: 42,
    fontWeight: 850,
    lineHeight: 1.3,
    color: "white",
    marginBottom: 35,
  },

  optionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 22,
    marginBottom: 40,
  },

  optionCard: {
    background: "#1b2d54",
    padding: "26px",
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,.08)",
    color: "white",
    display: "flex",
    gap: 16,
    alignItems: "center",
    textAlign: "left",
    cursor: "pointer",
    transition: "all .3s ease",
  },

  optionLetter: {
    minWidth: 45,
    height: 45,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
  },

  optionTitle: {
    fontSize: 19,
    fontWeight: 700,
    marginBottom: 6,
  },

  optionSub: {
    fontSize: 14,
    color: "#b7c4ff",
  },

  navRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  primaryBtn: {
    padding: "18px 34px",
    border: "none",
    borderRadius: 15,
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    fontSize: 18,
    fontWeight: 800,
    color: "white",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "15px 28px",
    borderRadius: 14,
    background: "transparent",
    border: "1px solid #55648f",
    color: "white",
    fontWeight: 700,
  },

  ghostBtn: {
    padding: "15px 28px",
    border: "none",
    borderRadius: 14,
    background: "#263d69",
    color: "#d7ddff",
    fontWeight: 700,
    cursor: "pointer",
  },

  resultIcon: {
    width: 100,
    height: 100,
    margin: "0 auto 25px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "white",
  },

  resultTitle: {
    fontSize: 52,
    fontWeight: 900,
    color: "white",
    marginBottom: 20,
  },

  resultText: {
    fontSize: 25,
    lineHeight: 1.7,
    color: "#d1dbff",
    marginBottom: 30,
  },

  pathBox: {
    background: "#1d2f58",
    padding: "28px",
    borderRadius: 22,
    marginBottom: 25,
  },

  pathLabel: {
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#a9bbff",
    marginBottom: 10,
  },

  pathText: {
    fontSize: 24,
    fontWeight: 800,
    color: "white",
  },

  practiceBox: {
    background: "#17284d",
    padding: "32px",
    borderRadius: 22,
    textAlign: "left",
    marginBottom: 35,
  },

  practiceTitle: {
    fontSize: 28,
    color: "white",
    marginBottom: 18,
  },

  practiceItem: {
    fontSize: 19,
    lineHeight: 1.8,
    color: "#c5d2ff",
  },
};
