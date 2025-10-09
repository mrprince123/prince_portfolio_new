import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  CheckCircle,
  Circle,
  BookOpen,
  Download,
  Award,
  Menu,
  X,
  ChevronRight,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
const apiUrl = import.meta.env.VITE_COURSE_URL;


const CourseDetails = () => {
  const { slug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({
    slug: "",
    title: "",
    description: "",
    coverImage: "",
    content: [] as { title: string; description: string; content: string }[],
    isVisible: true,
    tags: [],
    level: "",
    createdAt: "",
    updatedAt: "",
  });

  // Mock course data based on the provided schema
  const course = {
    title: "Complete React Developer Bootcamp",
    slug: "complete-react-developer-bootcamp",
    description:
      "Master React from basics to advanced concepts including hooks, context, testing, and modern development patterns. This comprehensive course will take you from a beginner to an advanced React developer with real-world projects and hands-on experience.",
    coverImage:
      "https://dummyimage.com/1280x720/6366f1/ffffff?text=React+Course",
    content: [
      {
        title: "Introduction to React",
        description:
          "Get started with React basics and understand the fundamentals",
        content: `# Introduction to React

React is a powerful JavaScript library for building user interfaces, particularly web applications. Developed by Facebook, it has become one of the most popular frontend frameworks in the world.

## What is React?

React is a **declarative, efficient, and flexible** JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

### Key Features:

- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updating and rendering of components
- **Unidirectional Data Flow**: Predictable state management
- **JSX Syntax**: Write HTML-like syntax in JavaScript
- **Rich Ecosystem**: Vast community and third-party libraries

## Why Choose React?

1. **Performance**: Virtual DOM ensures efficient updates
2. **Flexibility**: Can be integrated into existing projects
3. **Developer Experience**: Excellent tooling and debugging
4. **Community Support**: Large, active community
5. **Industry Adoption**: Used by major companies worldwide

## Prerequisites

Before diving into React, you should have:
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of ES6+ features (arrow functions, destructuring, modules)
- Familiarity with npm/yarn package managers

## Setting Up Your Development Environment

We'll use **Create React App** to set up our development environment quickly:

\`\`\`bash
npx create-react-app my-react-app
cd my-react-app
npm start
\`\`\`

This creates a new React application with all the necessary tools and configurations.

## Your First Component

Let's create a simple component:

\`\`\`jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
\`\`\`

This is a **functional component** that returns JSX. Components are the building blocks of React applications.

## Next Steps

In the next lesson, we'll explore:
- JSX syntax in detail
- Component props
- State management
- Event handling

Ready to continue your React journey? Let's move on to the next topic!`,
      },
      {
        title: "Understanding JSX",
        description:
          "Learn JSX syntax and how to write HTML-like code in JavaScript",
        content: `# Understanding JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files. It's one of React's most distinctive features.

## What is JSX?

JSX produces React "elements" and makes it easier to write and add HTML in React. It allows you to write HTML structures in the same file as JavaScript code.

### JSX Example:

\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\`

This looks like HTML, but it's actually JSX! Under the hood, this gets compiled to:

\`\`\`javascript
const element = React.createElement('h1', null, 'Hello, World!');
\`\`\`

## JSX Rules and Syntax

### 1. Return a Single Parent Element

JSX expressions must have one parent element:

\`\`\`jsx
// ✅ Correct
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ❌ Incorrect
return (
  <h1>Title</h1>
  <p>Content</p>
);
\`\`\`

### 2. Use React.Fragment or <> for Multiple Elements

\`\`\`jsx
// Using Fragment
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Content</p>
  </React.Fragment>
);

// Using short syntax
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
\`\`\`

### 3. JSX Attributes

Use camelCase for attributes:

\`\`\`jsx
<div className="container" onClick={handleClick}>
  <input type="text" autoFocus />
</div>
\`\`\`

### 4. JavaScript Expressions in JSX

Use curly braces {} to embed JavaScript:

\`\`\`jsx
const name = "React";
const element = <h1>Hello, {name}!</h1>;

const user = { firstName: "John", lastName: "Doe" };
const greeting = <h1>Hello, {user.firstName} {user.lastName}!</h1>;
\`\`\`

## Conditional Rendering

You can conditionally render elements using JavaScript operators:

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}
\`\`\`

## Lists and Keys

Render lists using the map() function:

\`\`\`jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number}</li>
);

return <ul>{listItems}</ul>;
\`\`\`

**Remember**: Always provide a unique \`key\` prop when rendering lists!

## JSX Best Practices

1. **Keep it readable**: Break complex JSX into smaller components
2. **Use meaningful names**: Choose descriptive variable and function names
3. **Consistent formatting**: Use consistent indentation and formatting
4. **Avoid complex logic**: Keep JSX simple, move complex logic to functions

## Common Gotchas

- Use \`className\` instead of \`class\`
- Use \`htmlFor\` instead of \`for\`
- Self-closing tags must end with \`/>\`
- JavaScript reserved words can't be used as attribute names

## Exercise

Try creating a component that displays your personal information using JSX!

\`\`\`jsx
function Profile() {
  const user = {
    name: "Your Name",
    age: 25,
    skills: ["JavaScript", "React", "CSS"]
  };

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <ul>
        {user.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

Great job! You now understand JSX fundamentals. Next, we'll dive into components and props.`,
      },
      {
        title: "Components and Props",
        description:
          "Learn how to create reusable components and pass data with props",
        content: `# Components and Props

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces that can be thought about in isolation.

## Types of Components

### 1. Functional Components (Recommended)

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Or using arrow function
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
\`\`\`

### 2. Class Components (Legacy)

\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
\`\`\`

**Note**: We'll focus on functional components as they're the modern standard.

## What are Props?

Props (short for "properties") are arguments passed into React components. Props are passed to components via HTML attributes and are **read-only**.

### Basic Props Example:

\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Alice" />
<Greeting name="Bob" />
\`\`\`

## Destructuring Props

You can destructure props for cleaner code:

\`\`\`jsx
// Instead of this:
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Use this:
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Multiple props:
function UserCard({ name, age, email }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}
\`\`\`

## Default Props

You can set default values for props:

\`\`\`jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}

// Or using defaultProps (older method)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

Greeting.defaultProps = {
  name: "Guest"
};
\`\`\`

Excellent! You now understand how to create components and pass data using props. Next, we'll explore state management and how to make components interactive.`,
      },
      {
        title: "State and Event Handling",
        description:
          "Learn how to manage component state and handle user interactions",
        content: `# State and Event Handling

State allows React components to store and manage data that can change over time. When state changes, React automatically re-renders the component to reflect the new state.

## Introduction to State

State is a JavaScript object that stores property values that belong to a component. When the state object changes, the component re-renders.

### useState Hook

The \`useState\` hook is the most common way to add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // Declare state variable with initial value
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### State Hook Syntax

\`\`\`jsx
const [stateVariable, setStateFunction] = useState(initialValue);
\`\`\`

- \`stateVariable\`: Current state value
- \`setStateFunction\`: Function to update state
- \`initialValue\`: Initial state value

## Event Handling

React uses SyntheticEvents, which are wrappers around native DOM events that provide consistent behavior across browsers.

### Common Event Handlers

\`\`\`jsx
function EventExamples() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Form submitted with message:', message);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      
      <form onSubmit={handleSubmit}>
        <input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
\`\`\`

Excellent! You now understand state management and event handling. Next, we'll explore React hooks in more detail.`,
      },
      {
        title: "React Hooks Deep Dive",
        description:
          "Master React hooks including useEffect, useContext, and custom hooks",
        content: `# React Hooks Deep Dive

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have revolutionized how we write React components.

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components. It serves the same purpose as \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\` combined in class components.

### Basic useEffect

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  return <div>Timer: {seconds} seconds</div>;
}
\`\`\`

### useEffect with Dependencies

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Fetch user data
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [userId]); // Runs when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## Custom Hooks

Custom hooks are JavaScript functions that start with "use" and can call other hooks.

\`\`\`jsx
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Using custom hooks
function App() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

Great job! You now have a solid understanding of React hooks. This completes our React fundamentals course!`,
      },
    ],
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    isVisible: true,
    level: "Beginner",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  };

  // Call the same api
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(
          `${apiUrl}/${slug}`,
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        const serverData = response.data.data;
        console.log("data ", serverData);

        // ✅ Fix: check if it's a valid object, not array
        if (serverData && Object.keys(serverData).length > 0) {
          setCourseDetails(serverData);
        } else {
          setCourseDetails(course);
        }
      } catch (error) {
        console.warn("Error fetching course:", error.message);
        setCourseDetails(course);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [slug]);

  const toggleTopicComplete = (topicIndex: number) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicIndex)) {
      newCompleted.delete(topicIndex);
    } else {
      newCompleted.add(topicIndex);
    }
    setCompletedTopics(newCompleted);
  };

  const getProgressPercentage = () => {
    return Math.round(
      (completedTopics.size / courseDetails.content.length) * 100
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="flex">
          {/* Desktop Sidebar Skeleton */}
          <aside className="hidden lg:block w-80 border-r bg-card/50 backdrop-blur-sm">
            <div className="sticky top-0 h-screen overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-3 w-40 mb-2" />
                  <Skeleton className="h-2 w-full rounded-full mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Separator className="mb-6" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1">
            <div className="container mx-auto max-w-4xl p-6">
              {/* Mobile menu button skeleton */}
              <div className="lg:hidden mb-6">
                <Skeleton className="h-9 w-48" />
              </div>

              {/* Course header skeleton */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-28" />
                </div>

                <Skeleton className="h-10 w-3/4 mb-4" />

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-4 w-24" />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-11 w-48" />
                  <Skeleton className="h-11 w-52" />
                </div>
              </div>

              {/* Topic Content Skeleton */}
              <Card className="shadow-soft mb-8">
                <CardHeader>
                  <Skeleton className="h-8 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="pt-4">
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>

              {/* Navigation Skeleton */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-background border-r overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Course Topics</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {completedTopics.size} of {courseDetails.content.length}{" "}
                  topics completed
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {getProgressPercentage()}% Complete
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2">
                {courseDetails.content.map((topic, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTopic === index
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      setSelectedTopic(index);
                      setSidebarOpen(false);
                    }}
                  >
                    <button
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopicComplete(index);
                      }}
                    >
                      {completedTopics.has(index) ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          selectedTopic === index ? "text-primary" : ""
                        }`}
                      >
                        {topic.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {topic.description}
                      </div>
                    </div>
                    {selectedTopic === index && (
                      <ChevronRight className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r bg-card/50 backdrop-blur-sm">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Topics
                </h3>
                <div className="text-sm text-muted-foreground mb-2">
                  {completedTopics.size} of {courseDetails.content.length}{" "}
                  topics completed
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {getProgressPercentage()}% Complete
                </div>
              </div>

              <Separator className="mb-6" />

              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-2">
                  {courseDetails.content.map((topic, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTopic === index
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedTopic(index)}
                    >
                      <button
                        className="shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTopicComplete(index);
                        }}
                      >
                        {completedTopics.has(index) ? (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium truncate ${
                            selectedTopic === index ? "text-primary" : ""
                          }`}
                        >
                          {topic.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {topic.description}
                        </div>
                      </div>
                      {selectedTopic === index && (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto max-w-4xl p-6">
            {/* Mobile menu button */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4 mr-2" />
                Course Topics ({completedTopics.size}/
                {courseDetails.content.length})
              </Button>
            </div>

            {/* Course header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {courseDetails.content[selectedTopic] && (
                  <Badge variant="outline" className="text-xs">
                    Topic {selectedTopic + 1} of {courseDetails.content.length}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {getProgressPercentage()}% Complete
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {courseDetails.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  12 hours content
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {courseDetails.content.length} topics
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {courseDetails.level}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(courseDetails.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group"
                  onClick={() => toggleTopicComplete(selectedTopic)}
                >
                  {completedTopics.has(selectedTopic) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Incomplete
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resources
                </Button>
              </div>
            </div>

            {/* Topic Content */}
            {courseDetails.content[selectedTopic] && (
              <Card className="shadow-soft mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {courseDetails.content[selectedTopic].title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {courseDetails.content[selectedTopic].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                  <div
                    className="leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: courseDetails.content[selectedTopic].content,
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                disabled={selectedTopic === 0}
                onClick={() =>
                  setSelectedTopic((prev) => Math.max(0, prev - 1))
                }
              >
                Previous Topic
              </Button>

              <span className="text-sm text-muted-foreground">
                Topic {selectedTopic + 1} of {courseDetails.content.length}
              </span>

              <Button
                disabled={selectedTopic === courseDetails.content.length - 1}
                onClick={() =>
                  setSelectedTopic((prev) =>
                    Math.min(courseDetails.content.length - 1, prev + 1)
                  )
                }
              >
                Next Topic
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;
