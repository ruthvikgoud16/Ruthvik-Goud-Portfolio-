#!/usr/bin/env python3
"""ATS-friendly single-column one-page resume (Helvetica core fonts)."""
from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).with_name("resume.pdf")
LM, RM = 13.5, 13.5


class Resume(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="Letter")
        self.set_auto_page_break(auto=False, margin=10)
        self.add_page()
        self.set_left_margin(LM)
        self.set_right_margin(RM)
        self.set_top_margin(10)

    def usable_w(self):
        return self.w - self.l_margin - self.r_margin

    def h_line(self):
        self.set_draw_color(30, 30, 30)
        self.set_line_width(0.32)
        y = self.get_y()
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(1.8)

    def section(self, title: str):
        self.ln(1.3)
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(0, 0, 0)
        self.cell(0, 4.6, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.h_line()

    def role_header(self, left: str, right: str):
        y = self.get_y()
        date_w = 42
        left_w = self.usable_w() - date_w
        self.set_font("Helvetica", "B", 10)
        self.set_xy(self.l_margin, y)
        self.cell(left_w, 4.3, left)
        self.set_font("Helvetica", "", 9)
        self.set_xy(self.l_margin + left_w, y)
        self.cell(date_w, 4.3, right, align="R")
        self.set_xy(self.l_margin, y + 4.3)

    def italic_line(self, text: str):
        self.set_font("Helvetica", "I", 8.7)
        self.set_text_color(45, 45, 45)
        self.cell(0, 3.8, text, new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(0, 0, 0)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 9.2)
        self.set_x(self.l_margin)
        self.cell(3.6, 3.9, "-")
        self.multi_cell(self.usable_w() - 3.6, 3.9, text)

    def skills_line(self, label: str, rest: str):
        self.set_font("Helvetica", "B", 9.2)
        self.write(3.95, f"{label}: ")
        self.set_font("Helvetica", "", 9.2)
        self.write(3.95, rest)
        self.ln(4.15)


def build():
    pdf = Resume()

    pdf.set_font("Helvetica", "B", 17)
    pdf.cell(0, 7.2, "B. RUTHVIK GOUD", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 3.9, "Hyderabad, Telangana, India", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(
        0,
        3.9,
        "+91 9392796458  |  bathiniruthvik380@gmail.com  |  linkedin.com/in/ruthvikgoud16",
        align="C",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.cell(
        0,
        3.9,
        "github.com/ruthvikgoud16  |  ruthvikgoud.vercel.app",
        align="C",
        new_x="LMARGIN",
        new_y="NEXT",
    )

    pdf.section("Professional Summary")
    pdf.set_font("Helvetica", "", 9.2)
    pdf.multi_cell(
        0,
        3.85,
        "ECE undergraduate and AI engineer focused on agentic systems, retrieval, and automation. "
        "Incoming AI Engineer Intern at Sydon AI (starts 28 Oct 2026). "
        "Previously an AI and Automation Intern at Nimblize and a Data Analyst Intern at Bluestock Fintech.",
    )

    pdf.section("Education")
    pdf.role_header("Anurag University, Hyderabad", "2026 - 2030")
    pdf.italic_line("B.Tech, Electronics and Communication Engineering (ECE)")
    pdf.bullet(
        "Coursework: Data Structures and Algorithms, OOP (C++), DBMS, Operating Systems, Computer Networks, Engineering Mathematics, Digital System Design"
    )

    pdf.section("Experience")
    pdf.role_header("Incoming AI Engineer Intern | Sydon AI", "Starts 28 Oct 2026")
    pdf.italic_line("Retrieval, document processing, source attribution. Role not yet started.")
    pdf.bullet("Six-month internship focused on connecting retrieval with business data for grounded answers.")
    pdf.bullet("Planned work only. No completed deliverables are listed.")

    pdf.role_header("Data Analyst Intern | Bluestock Fintech", "2026")
    pdf.italic_line("Mutual fund analytics. Completed. Exact months not on file.")
    pdf.bullet("Worked on data processing, SQL, cleaning, and dashboards for financial analytics.")

    pdf.role_header("AI and Automation Intern | Nimblize", "May 2026")
    pdf.italic_line("Competitor intelligence and recommendations. Completed. End month not on file.")
    pdf.bullet("Explored multi-agent orchestration, RAG, FastAPI, PostgreSQL, and Redis on internship workflows.")

    pdf.section("Projects")
    pdf.role_header("Pramana | Evidence-Gated Enterprise Knowledge System", "")
    pdf.italic_line("LangGraph, GraphRAG, FastAPI, Python, RBAC")
    pdf.bullet(
        "Multi-agent pipeline (privacy gate, authorization, hybrid GraphRAG, draft, verify, fact-check, govern) that authorizes before retrieval and refuses when evidence is insufficient."
    )

    pdf.role_header("Nimblize | AI Product Intelligence Platform", "")
    pdf.italic_line("FastAPI, LangGraph, PostgreSQL, Redis, Gemini")
    pdf.bullet(
        "Competitor-intelligence and product-recommendation workflows with RAG, prompt management, and scalable AI APIs (internship product)."
    )

    pdf.role_header("TalentLens X | AI Candidate Discovery and Ranking", "")
    pdf.italic_line("Next.js, Supabase, PostgreSQL, pgvector, Gemini")
    pdf.bullet(
        "Semantic candidate search with weighted ranking (Career 35%, Recruitability 25%, Skills 25%, Semantic Match 15%) and indexed vector search."
    )

    pdf.role_header("Aero Dot | Autonomous ESP32 Drone Platform", "")
    pdf.italic_line("Embedded C++, ESP32, PID control")
    pdf.bullet("Autonomous flight firmware with PID stabilization, ToF sensing, and obstacle-aware control loops.")

    pdf.section("Technical Skills")
    pdf.skills_line("Languages", "Python, C++, C, JavaScript, TypeScript, SQL")
    pdf.skills_line("Software", "React, Next.js, Node.js, Express.js, FastAPI, REST APIs, HTML, CSS, Tailwind CSS")
    pdf.skills_line("AI / ML", "LangGraph, RAG, GraphRAG, Gemini API, Semantic Search, Vector Embeddings, Prompt Engineering")
    pdf.skills_line("Data & Tools", "PostgreSQL, MongoDB, Firebase, Supabase, pgvector, Redis, Git, GitHub, Linux, Docker, VS Code")

    pdf.section("Leadership")
    pdf.bullet(
        "OnePlus Student Ambassador (2026): selected among approximately 100 ambassadors nationwide; campus and community representation."
    )
    pdf.bullet("Unstop Campus Champion: campus outreach connecting students to opportunities and competitions.")

    pdf.output(str(OUT))
    print(f"Wrote {OUT} pages={pdf.page_no()}")


if __name__ == "__main__":
    build()
