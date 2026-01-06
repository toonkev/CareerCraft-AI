# CareerCraft-AI

**CareerCraft-AI** is an intelligent, full-stack career development platform designed to empower job seekers. By leveraging the power of the Google Gemini API, it provides automated resume optimization, tailored cover letter generation, and smart career insights to help users navigate the modern job market with confidence.

---

## 🚀 Features

* **AI Resume Builder:** Automatically generate and refine professional resumes based on your experience.
* **Tailored Cover Letters:** Create job-specific cover letters that highlight your unique strengths.
* **ATS Optimization:** Ensure your documents are optimized for Applicant Tracking Systems.
* **Smart Insights:** Get AI-driven feedback on how to improve your professional profile.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Next.js Server Actions
* **AI Integration:** Google Gemini Pro API
* **Styling:** Radix UI / shadcn/ui

---

## 🏃 Run Locally

Follow these steps to get a local copy of the project up and running.

### 📋 Prerequisites

* **Node.js:** Ensure you have Node.js installed (LTS version recommended). You can check by running `node -v` in your terminal.

### 🔧 Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/toonkev/CareerCraft-AI.git
    cd CareerCraft-AI
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a file named `.env.local` in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
├── components/       # Reusable UI components
├── app/              # Next.js App router (pages and logic)
├── public/           # Static assets (images, icons)
├── styles/           # Global CSS and Tailwind configurations
└── lib/              # Helper functions and AI configuration
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request