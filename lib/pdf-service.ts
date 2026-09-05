export const pdfService = {
  generateLessonNotes: (courseTitle: string, lessonTitle: string, content: string) => {
    const blob = new Blob([`
      DEVFLOW LEARNING RESOURCES
      =========================
      Course: ${courseTitle}
      Lesson: ${lessonTitle}
      -------------------------
      ${content}

      © 2026 DevFlow EdTech Platform. All rights reserved.
    `], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lessonTitle.toLowerCase().replace(/ /g, '-')}-notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }
};
