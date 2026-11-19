// Runs the Day 1 reference lessons, then checks the student exercises.
//   npm run lab:day1
//
// Student checks never fail the command: "todo" is expected until you finish.

import { runLesson01 } from "./reference/01-what-typescript-adds";
import { runLesson02 } from "./reference/02-inference-and-annotations";
import { runLesson03 } from "./reference/03-primitives";
import { runLesson04 } from "./reference/04-typed-arrays";
import { runLesson05 } from "./reference/05-object-shapes";
import { runLesson06 } from "./reference/06-functions";
import { runLesson07 } from "./reference/07-compiler-errors";
import { runLesson08 } from "./reference/08-nullable-values";
import { runLesson09 } from "./reference/09-business-rule";
import { sampleLeads } from "./sample-leads";
import { countFollowUps, FOLLOW_UP_AFTER_DAYS } from "./lead-rules";
import { runStudentChecks } from "./exercises/check-exercises";

console.log("=== FounderFlow - Week 05 Day 01 - TypeScript Foundations ===\n");

console.log("--- Reference lessons ---");
runLesson01();
runLesson02();
runLesson03();
runLesson04();
runLesson05();
runLesson06();
runLesson07();
runLesson08();
runLesson09();

console.log("\n--- Same logic the dashboard uses ---");
console.log(
  `Rule: follow up after ${FOLLOW_UP_AFTER_DAYS}+ days. ` +
    `${countFollowUps(sampleLeads)} of ${sampleLeads.length} sample leads need follow-up.`,
);

console.log("\n--- Student exercises ---");
runStudentChecks();
