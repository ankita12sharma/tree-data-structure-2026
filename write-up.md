# 🌳 The Daily Reflection Tree — Design Write-Up

---

## 1. Problem Understanding

The objective of this assignment is to design a **deterministic reflection system** that guides users through structured self-reflection at the end of the day.

Unlike traditional systems that rely on free-text input or AI-generated responses, this system is:

- Fully rule-based
- Fully deterministic
- Fully traceable

The goal is to encode reflection as a structured decision tree, where each user choice leads to a predefined and explainable outcome.

This ensures consistency, transparency, and repeatability of behavioral insights.

---

## 2. Design Approach

The system is built around **three psychological axes**, each representing a key dimension of human behavior:

### 🧭 Axis 1: Locus of Control (Victim ↔ Victor)

Based on Julian Rotter’s theory, this axis evaluates whether individuals attribute outcomes to:

- Internal control (agency, responsibility, adaptation)
- External forces (circumstances, luck, others)

This axis identifies perceived ownership of actions and outcomes.

---

### 🤝 Axis 2: Contribution vs Entitlement

This axis distinguishes between:

- Contribution mindset → giving value, helping, supporting others
- Entitlement mindset → expecting recognition, comparison, receiving focus

It is inspired by:

- Organizational Citizenship Behavior (OCB)
- Psychological entitlement theory (Campbell et al.)

---

### 🌍 Axis 3: Radius of Concern (Self ↔ System)

This axis evaluates the scope of thinking:

- Self-focused perspective
- Balanced self + others perspective
- System-level / collective perspective

It is based on:

- Maslow’s self-transcendence concept
- Perspective-taking theory (Batson)

---

## 3. Tree Design Logic

The system is implemented as a deterministic decision tree:

### ✔ Question Nodes

- Fixed multiple-choice options
- No free-text input
- Direct mapping to behavioral signals

### ✔ Decision Nodes

- Handle routing logic based on previous answers
- Ensure deterministic branching

### ✔ Reflection Nodes

- Provide neutral insights after each axis
- Help users interpret behavior without judgment

### ✔ Bridge Nodes

- Transition between axes smoothly
- Maintain narrative flow

### ✔ Summary Node

- Aggregates signals across axes
- Produces final classification:
  - Reactive Pattern
  - Growth Pattern
  - Stewardship Pattern

---

## 4. Key Design Trade-offs

### Fixed Options vs Free Text

Free-text was avoided because it:

- Introduces ambiguity
- Breaks deterministic flow
- Requires AI interpretation

Fixed options ensure:

- Predictability
- Clean structure
- Easy evaluation

---

### Deterministic System over AI System

No LLM is used at runtime:

- Same input → same output
- No randomness
- Fully auditable system

---

### Depth vs Simplicity

The system balances:

- Psychological depth (3 axes)
- Usability (simple decision choices)

Some nuance is intentionally simplified for clarity.

---

## 5. Psychological Foundations

- Locus of Control — Julian Rotter
- Growth Mindset — Carol Dweck
- Organizational Citizenship Behavior — Dennis Organ
- Self-Transcendence — Abraham Maslow
- Perspective Taking — Batson

These theories were translated into structured decision points in the tree.

---

## 6. Improvements & Future Scope

- Add more behavioral axes
- Deeper branching logic per response
- Long-term behavioral tracking
- Team-level analytics
- Integration with productivity systems

---

## Conclusion

This project demonstrates how psychological frameworks can be encoded into a deterministic system.

Instead of relying on AI-generated reflection, the system embeds reasoning directly into structure, making it:

- Transparent
- Repeatable
- Explainable
- Scalable

The result is a knowledge-engineered behavioral reflection system that converts human psychology into structured decision flows.
