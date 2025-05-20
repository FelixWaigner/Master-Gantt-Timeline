import React, { useState } from 'react';
import './App.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

// Custom TaskListHeader component that only shows the Task Name column
const CustomTaskListHeader: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> = ({ headerHeight, rowWidth, fontFamily, fontSize }) => {
  return (
    <div
      className="taskListHeaderContainer"
      style={{
        height: headerHeight,
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className="taskListHeader"
        style={{
          height: headerHeight,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e6e4e4',
          borderTop: '1px solid #e6e4e4',
          borderLeft: '1px solid #e6e4e4',
          paddingLeft: '10px',
        }}
      >
        <div style={{ minWidth: rowWidth }}>
          Task Name
        </div>
      </div>
    </div>
  );
};

// Custom TaskListTable component that only shows the Task Name column
const CustomTaskListTable: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  selectedTaskId,
  setSelectedTask,
  onExpanderClick,
}) => {
    return (
      <div
        className="taskListTableContainer"
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map(task => {
          let expanderSymbol = "";
          if (task.hideChildren === false) {
            expanderSymbol = "▼";
          } else if (task.hideChildren === true) {
            expanderSymbol = "▶";
          }

          return (
            <div
              className="taskListTableRow"
              style={{
                height: rowHeight,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #e6e4e4',
                borderLeft: '1px solid #e6e4e4',
                cursor: 'pointer',
                backgroundColor: task.id === selectedTaskId ? '#f0f0f0' : undefined,
              }}
              key={`${task.id}row`}
              onClick={() => setSelectedTask(task.id)}
            >
              <div
                className="taskListCell"
                style={{
                  minWidth: rowWidth,
                  paddingLeft: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title={task.name}
              >
                <div
                  className="taskListExpander"
                  style={{
                    color: '#555',
                    fontSize: '0.6rem',
                    padding: '0.15rem 0.2rem 0rem 0.2rem',
                    userSelect: 'none',
                    cursor: 'pointer',
                    visibility: expanderSymbol ? 'visible' : 'hidden',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpanderClick(task);
                  }}
                >
                  {expanderSymbol}
                </div>
                <div style={{
                  marginLeft: '5px',
                  paddingLeft: task.project ? '20px' : '0px',
                  fontWeight: task.type === 'project' ? 'bold' : 'normal'
                }}>{task.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

function App() {
  const [view, setView] = useState<ViewMode>(ViewMode.Week);

  // Format date for display (DD.MM.YYYY)
  const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  // Helper function to convert DD.MM.YYYY to JavaScript Date
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.');
    return new Date(`${year}-${month}-${day}`);
  };

  // Define tasks for Gantt chart
  const tasks: Task[] = [
    // Setup
    {
      id: "Setup",
      name: "Setup",
      start: parseDate("14.05.2025"),
      end: parseDate("25.05.2025"),
      progress: 20, // Since the current date is May 20, 2025
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#0DB9D7', progressSelectedColor: '#0DB9D7' }
    },
    {
      id: "Setup_Task1",
      name: "Setup and Planning",
      start: parseDate("14.05.2025"),
      end: parseDate("25.05.2025"),
      progress: 20,
      type: 'task',
      project: "Setup",
      isDisabled: true,
      styles: { progressColor: '#0DB9D7', progressSelectedColor: '#0DB9D7' }
    },

    // Introduction
    {
      id: "Introduction",
      name: "1. Introduction",
      start: parseDate("26.05.2025"),
      end: parseDate("24.06.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task1",
      name: "1.1 Background and Context",
      start: parseDate("26.05.2025"),
      end: parseDate("30.05.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task2",
      name: "1.2 Motivation",
      start: parseDate("31.05.2025"),
      end: parseDate("04.06.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task3",
      name: "1.3 Problem Statement",
      start: parseDate("05.06.2025"),
      end: parseDate("09.06.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task4",
      name: "1.4 Research Objectives",
      start: parseDate("10.06.2025"),
      end: parseDate("14.06.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task5",
      name: "1.5 Research Questions",
      start: parseDate("15.06.2025"),
      end: parseDate("19.06.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },
    {
      id: "Intro_Task6",
      name: "1.6 Structure of the Thesis",
      start: parseDate("20.06.2025"),
      end: parseDate("24.06.2025"),
      progress: 0,
      type: 'task',
      project: "Introduction",
      isDisabled: true,
      styles: { progressColor: '#FFD700', progressSelectedColor: '#FFD700' }
    },

    // Literature Review
    {
      id: "Literature",
      name: "2. Literature Review",
      start: parseDate("25.06.2025"),
      end: parseDate("25.07.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task1",
      name: "2.1 Design Thinking and Lean Innovation in Product Development",
      start: parseDate("25.06.2025"),
      end: parseDate("29.06.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task2",
      name: "2.2 Challenges in Traditional User Insight Generation",
      start: parseDate("30.06.2025"),
      end: parseDate("04.07.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task3",
      name: "2.3 AI and Automation in Qualitative Research",
      start: parseDate("05.07.2025"),
      end: parseDate("09.07.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task4",
      name: "2.4 NLP for User Feedback Analysis",
      start: parseDate("10.07.2025"),
      end: parseDate("14.07.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task5",
      name: "2.5 Summary of Literature and Identified Gaps",
      start: parseDate("15.07.2025"),
      end: parseDate("19.07.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },
    {
      id: "Lit_Task6",
      name: "Buffer: Literature Review",
      start: parseDate("20.07.2025"),
      end: parseDate("25.07.2025"),
      progress: 0,
      type: 'task',
      project: "Literature",
      isDisabled: true,
      styles: { progressColor: '#32CD32', progressSelectedColor: '#32CD32' }
    },

    // Methodology
    {
      id: "Methodology",
      name: "3. Methodology",
      start: parseDate("26.07.2025"),
      end: parseDate("25.08.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task1",
      name: "3.1 Research Design and Approach / Methodological Framework Definition",
      start: parseDate("26.07.2025"),
      end: parseDate("30.07.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task2",
      name: "3.2 Interviews and Requirements Gathering",
      start: parseDate("26.07.2025"),
      end: parseDate("19.08.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task3",
      name: "3.3 Overview of AI/NLP Techniques Used",
      start: parseDate("05.08.2025"),
      end: parseDate("09.08.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task4",
      name: "3.4 Criteria for Tool and Model Selection",
      start: parseDate("10.08.2025"),
      end: parseDate("14.08.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task5",
      name: "3.5 Ethical Considerations",
      start: parseDate("15.08.2025"),
      end: parseDate("19.08.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },
    {
      id: "Meth_Task6",
      name: "Buffer: Methodology",
      start: parseDate("20.08.2025"),
      end: parseDate("25.08.2025"),
      progress: 0,
      type: 'task',
      project: "Methodology",
      isDisabled: true,
      styles: { progressColor: '#FF8C00', progressSelectedColor: '#FF8C00' }
    },

    // System Design and Implementation
    {
      id: "SystemDesign",
      name: "4. System Design and Implementation",
      start: parseDate("26.08.2025"),
      end: parseDate("25.09.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task1",
      name: "4.1 Architecture Overview",
      start: parseDate("26.08.2025"),
      end: parseDate("28.08.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task2",
      name: "4.2 Data Collection and Preprocessing",
      start: parseDate("29.08.2025"),
      end: parseDate("04.09.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task3",
      name: "4.3 Data Analysis: Insight Extraction Techniques",
      start: parseDate("05.09.2025"),
      end: parseDate("09.09.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task4",
      name: "4.4 Insight Management and Visualization",
      start: parseDate("10.09.2025"),
      end: parseDate("14.09.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task5",
      name: "4.5 Technical Stack and Implementation",
      start: parseDate("15.09.2025"),
      end: parseDate("19.09.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },
    {
      id: "Sys_Task6",
      name: "Buffer: System Design and Implementation",
      start: parseDate("20.09.2025"),
      end: parseDate("25.09.2025"),
      progress: 0,
      type: 'task',
      project: "SystemDesign",
      isDisabled: true,
      styles: { progressColor: '#9370DB', progressSelectedColor: '#9370DB' }
    },

    // Evaluation
    {
      id: "Evaluation",
      name: "5. Evaluation",
      start: parseDate("26.09.2025"),
      end: parseDate("21.10.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },
    {
      id: "Eval_Task1",
      name: "5.1 Evaluation Design",
      start: parseDate("26.09.2025"),
      end: parseDate("30.09.2025"),
      progress: 0,
      type: 'task',
      project: "Evaluation",
      isDisabled: true,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },
    {
      id: "Eval_Task2",
      name: "5.2 Objective Evaluation",
      start: parseDate("01.10.2025"),
      end: parseDate("05.10.2025"),
      progress: 0,
      type: 'task',
      project: "Evaluation",
      isDisabled: true,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },
    {
      id: "Eval_Task3",
      name: "5.3 Subjective Evaluation",
      start: parseDate("06.10.2025"),
      end: parseDate("10.10.2025"),
      progress: 0,
      type: 'task',
      project: "Evaluation",
      isDisabled: true,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },
    {
      id: "Eval_Task4",
      name: "5.4 Results and Interpretation",
      start: parseDate("11.10.2025"),
      end: parseDate("15.10.2025"),
      progress: 0,
      type: 'task',
      project: "Evaluation",
      isDisabled: true,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },
    {
      id: "Eval_Task5",
      name: "Buffer: Evaluation",
      start: parseDate("16.10.2025"),
      end: parseDate("21.10.2025"),
      progress: 0,
      type: 'task',
      project: "Evaluation",
      isDisabled: true,
      styles: { progressColor: '#DC143C', progressSelectedColor: '#DC143C' }
    },

    // Discussion
    {
      id: "Discussion",
      name: "6. Discussion",
      start: parseDate("22.10.2025"),
      end: parseDate("16.11.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },
    {
      id: "Disc_Task1",
      name: "6.1 Key Findings and Implications",
      start: parseDate("22.10.2025"),
      end: parseDate("26.10.2025"),
      progress: 0,
      type: 'task',
      project: "Discussion",
      isDisabled: true,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },
    {
      id: "Disc_Task2",
      name: "6.2 Contributions to Design Thinking Practice",
      start: parseDate("27.10.2025"),
      end: parseDate("31.10.2025"),
      progress: 0,
      type: 'task',
      project: "Discussion",
      isDisabled: true,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },
    {
      id: "Disc_Task3",
      name: "6.3 Limitations of the Study",
      start: parseDate("01.11.2025"),
      end: parseDate("05.11.2025"),
      progress: 0,
      type: 'task',
      project: "Discussion",
      isDisabled: true,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },
    {
      id: "Disc_Task4",
      name: "6.4 Recommendations for Practitioners",
      start: parseDate("06.11.2025"),
      end: parseDate("10.11.2025"),
      progress: 0,
      type: 'task',
      project: "Discussion",
      isDisabled: true,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },
    {
      id: "Disc_Task5",
      name: "Buffer: Discussion",
      start: parseDate("11.11.2025"),
      end: parseDate("16.11.2025"),
      progress: 0,
      type: 'task',
      project: "Discussion",
      isDisabled: true,
      styles: { progressColor: '#4169E1', progressSelectedColor: '#4169E1' }
    },

    // Conclusion and Future Work
    {
      id: "Conclusion",
      name: "7. Conclusion and Future Work",
      start: parseDate("17.11.2025"),
      end: parseDate("07.12.2025"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#2E8B57', progressSelectedColor: '#2E8B57' }
    },
    {
      id: "Conc_Task1",
      name: "7.1 Summary of Contributions",
      start: parseDate("17.11.2025"),
      end: parseDate("21.11.2025"),
      progress: 0,
      type: 'task',
      project: "Conclusion",
      isDisabled: true,
      styles: { progressColor: '#2E8B57', progressSelectedColor: '#2E8B57' }
    },
    {
      id: "Conc_Task2",
      name: "7.2 Answering the Research Questions",
      start: parseDate("22.11.2025"),
      end: parseDate("26.11.2025"),
      progress: 0,
      type: 'task',
      project: "Conclusion",
      isDisabled: true,
      styles: { progressColor: '#2E8B57', progressSelectedColor: '#2E8B57' }
    },
    {
      id: "Conc_Task3",
      name: "7.3 Outlook and Research Opportunities",
      start: parseDate("27.11.2025"),
      end: parseDate("01.12.2025"),
      progress: 0,
      type: 'task',
      project: "Conclusion",
      isDisabled: true,
      styles: { progressColor: '#2E8B57', progressSelectedColor: '#2E8B57' }
    },
    {
      id: "Conc_Task4",
      name: "Buffer: Conclusion",
      start: parseDate("02.12.2025"),
      end: parseDate("07.12.2025"),
      progress: 0,
      type: 'task',
      project: "Conclusion",
      isDisabled: true,
      styles: { progressColor: '#2E8B57', progressSelectedColor: '#2E8B57' }
    },

    // Finalization
    {
      id: "Finalization",
      name: "Finalization",
      start: parseDate("08.12.2025"),
      end: parseDate("05.01.2026"),
      progress: 0,
      type: 'project',
      isDisabled: true,
      hideChildren: false,
      styles: { progressColor: '#8B4513', progressSelectedColor: '#8B4513' }
    },
    {
      id: "Final_Task1",
      name: "Proofreading",
      start: parseDate("08.12.2025"),
      end: parseDate("21.12.2025"),
      progress: 0,
      type: 'task',
      project: "Finalization",
      isDisabled: true,
      styles: { progressColor: '#8B4513', progressSelectedColor: '#8B4513' }
    },
    {
      id: "Final_Task2",
      name: "Final Formatting",
      start: parseDate("22.12.2025"),
      end: parseDate("28.12.2025"),
      progress: 0,
      type: 'task',
      project: "Finalization",
      isDisabled: true,
      styles: { progressColor: '#8B4513', progressSelectedColor: '#8B4513' }
    },
    {
      id: "Final_Task3",
      name: "Submission Preparation",
      start: parseDate("28.12.2025"),
      end: parseDate("05.01.2026"),
      progress: 0,
      type: 'task',
      project: "Finalization",
      isDisabled: true,
      styles: { progressColor: '#8B4513', progressSelectedColor: '#8B4513' }
    },
  ];

  // View mode buttons handler
  const handleViewModeChange = (mode: ViewMode) => {
    setView(mode);
  };

  return (
    <div className="App">
      <div className="view-buttons">
        <button onClick={() => handleViewModeChange(ViewMode.Day)}>Day</button>
        <button onClick={() => handleViewModeChange(ViewMode.Week)}>Week</button>
      </div>
      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          viewMode={view}
          listCellWidth="300px"
          columnWidth={60}
          locale="de"
          TooltipContent={({ task }) => (
            <div className="tooltip-content">
              <h4>{task.name}</h4>
              <p>Start: {formatDate(task.start)}</p>
              <p>Ende: {formatDate(task.end)}</p>
            </div>
          )}
          preStepsCount={1}
          TaskListHeader={CustomTaskListHeader}
          TaskListTable={CustomTaskListTable}
        />
      </div>
    </div>
  );
}

export default App;
